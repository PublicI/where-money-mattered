const Router = require('express').Router;
const archieml = require('archieml');
const {google} = require('googleapis');
const htmlEntities = require('html-entities');
const htmlparser = require('htmlparser2');
const url = require('url');
const LRU = require('lru-cache');
const fs = require('fs');

const Entities = htmlEntities.AllHtmlEntities;

const exportUrl =
    'https://docs.google.com/feeds/download/documents/export/Export?id={{id}}&exportFormat=html';

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost'
);

let bodyCache = LRU({
    max: 50,
    maxAge: 1000 * 60
});

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

google.options({
    auth: oauth2Client
});

function parseGoogleDoc(body, cb) {
    /*
    // remove Google Docs comments
    body = body.replace(/\[[a-z]{1,2}\]/g,'');
    */

    const handler = new htmlparser.DomHandler((err, dom) => {
        if (err) {
            cb(err);
            return;
        }

        let italicClasses = [];

        const tagHandlers = {
            base(tag) {
                let str = '';
                tag.children.forEach(child => {
                    const func = tagHandlers[child.name || child.type] || false;
                    if (func) str += func(child);
                });
                return str;
            },
            text(textTag) {
                return textTag.data;
            },
            style(styleTag) {
                return tagHandlers.base(styleTag);
            },
            span(spanTag) {
                if (spanTag.attribs && spanTag.attribs.class) {
                    let italics = spanTag.attribs.class
                                    .split(' ')
                                    .find(className => italicClasses.indexOf(className) !== -1);

                    if (italics) {
                        return `<em>${tagHandlers.base(spanTag)}</em>`;
                    }
                }
                return tagHandlers.base(spanTag);
            },
            p(pTag) {
                return `${tagHandlers.base(pTag)}\n\n`;
            },
            a(aTag) {
                let href = aTag.attribs.href;
                if (href === undefined) return '';

                // extract real URLs from Google's tracking
                // from: http://www.google.com/url?q=http%3A%2F%2Fwww.nytimes.com...
                // to: http://www.nytimes.com...
                if (
                    aTag.attribs.href &&
                    url.parse(aTag.attribs.href, true).query &&
                    url.parse(aTag.attribs.href, true).query.q
                ) {
                    href = url.parse(aTag.attribs.href, true).query.q;
                }

                let str = `<a href="${href}">`;
                str += tagHandlers.base(aTag);
                str += '</a>';
                return str;
            },
            li(tag) {
                return `* ${tagHandlers.base(tag)}\n`;
            }
        };

        ['ul', 'ol'].forEach(tag => {
            tagHandlers[tag] = tagHandlers.span;
        });
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
            tagHandlers[tag] = tagHandlers.p;
        });

        try {
            let docRoot = dom[0];
            while (docRoot && docRoot.name !== 'html') {
                docRoot = docRoot.next;
            }
            const head = docRoot.children[0];

            let parsedStyle = tagHandlers.base(head);

            let italicClassMatches = parsedStyle
                    .match(/(\.[a-z][0-9]+){[^}]*font-style:italic[^}]*/g);

            if (italicClassMatches) {
                italicClasses = italicClassMatches.map((str) => str.slice(1,str.indexOf('{')));
            }

            const body = docRoot.children[1];
            let parsedText = tagHandlers.base(body);

            // Convert html entities into the characters as they exist in the google doc
            const entities = new Entities();
            parsedText = entities.decode(parsedText);

            // Remove smart quotes from inside tags
            parsedText = parsedText.replace(/<[^<>]*>/g, match =>
                match.replace(/”|“/g, '"').replace(/‘|’/g, "'")
            );

            // fs.writeFileSync('out.html',parsedText);

            const archieData = archieml.load(parsedText);

            cb(null, archieData);
        } catch (e) {
            cb(e);
        }
    });

    const parser = new htmlparser.Parser(handler);
    parser.write(body);
    parser.done();
}

function getExportLink(docId) {
    return exportUrl.replace('{{id}}', docId);
}

function getData(doc, cb) {
    let result = bodyCache.get(doc.id);

    if (typeof result !== 'undefined' && result) {
        cb(null, JSON.parse(result));
        return;
    }

    oauth2Client.request(
        {
            // method: 'GET',
            url: getExportLink(doc.id)
        },
        (err, { data }) => {
            if (err) {
                cb(err);
                return;
            }

            parseGoogleDoc(data, (err, result) => {
                if (err) {
                    cb(err);
                    return;
                }

                bodyCache.set(doc.id, JSON.stringify(result));
/*
                if ('slug' in result) {
                    slugCache.set(result.slug, doc.id);
                }

                if ('parts' in result) {
                    result.parts.forEach(part => {
                        slugCache.set(part.slug, part.id);
                    });
                }
*/
                cb(null, result);
            });
        }
    );
}

function getIndexDoc(cb) {
    getData(
        {
            id: process.env.GOOGLE_INDEX_DOC
        },
        cb
    );
}

function retrieve(slug, cb) {
    /*
    let docId = slugCache.get(slug);

    if (typeof docId !== 'undefined' && docId) {
        getData(
            {
                id: docId
            },
            cb
        );
    } else {
    */
    getIndexDoc((err, results) => {
        if (err) {
            cb(err);
            return;
        }

        if (results.slug && results.slug === slug) {
            cb(null, results);
            return;
        }

        let docId = null;

        if (results.parts) {
            results.parts.forEach(doc => {
                if (doc.slug === slug) {
                    docId = doc.id;
                }
            });
        }

        if (docId === null) {
            cb(new Error('not found'));
            return;
        }

        getData(
            {
                id: docId
            },
            (err, doc) => {
                if (err) {
                    cb(err);
                    return;
                }

                doc.series = results;

                cb(null, doc);
            }
        );
    });
    // }
}

const router = Router();

router.get('/docs/index.json', function(req, res, next) {
    getIndexDoc((err, doc) => {
        if (err) {
            console.error(err);
            res.sendStatus(404);
            return;
        }

        res.json(doc);
    });
});

router.get('/docs/:slug.json', function(req, res, next) {
    const slug = req.params.slug;

    retrieve(slug, (err, doc) => {
        if (err) {
            console.error(err);
            res.sendStatus(404);
            return;
        }

        res.json(doc);
    });
});

module.exports = router;
