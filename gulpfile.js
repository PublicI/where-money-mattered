const fs = require('fs'),
    pkg = require('./package.json'),
    gulp = require('gulp'),
    axios = require('axios');

function bakeStory(slug) {
    return axios
        .get(
            `https://${process.env.HOST ? process.env.HOST : 'localhost'}:${
                process.env.PORT ? process.env.PORT : 3000
            }/abandoned-in-america/api/docs/${slug}.json`
        )
        .then(result => {
            return new Promise((resolve, reject) => {
                fs.writeFileSync(
                    __dirname +
                        '/static/api/docs/' +
                        (slug ? slug : 'index') +
                        '.json',
                    JSON.stringify(result.data, null, 2)
                );

                resolve();
            });
        });
}

const slugs = [
    'index',
    'walled-off',
    'border-closing-history',
    'disastrous-recovery',
    'ballot-box-barriers',
    'train-off-track',
    'no-place-to-call-home',
    'housing-tax-credits',
    'forgotten-and-failing',
    'yazoo-education-history'
];

gulp.task('bake-stories', () => {
    return Promise.all(slugs.map(slug => bakeStory(slug)));
});

gulp.task('resize-img', () => {
    const imagemin = require('gulp-imagemin'),
        imageminJpegRecompress = require('imagemin-jpeg-recompress'),
        responsive = require('gulp-responsive'),
        rename = require('gulp-rename');

    gulp.src('static/img/**/*.{png,jpg,JPG,jpeg}', {
        base: 'static/img/'
    })
        .pipe(
            rename(function(path) {
                if (path.extname == '.JPG') {
                    path.extname = '.jpg';
                }
                if (path.extname == '.jpeg') {
                    path.extname = '.jpg';
                }
            })
        )
        .pipe(
            responsive(
                {
                    '**/*': [
                        {
                            width: 2880,
                            rename: { suffix: '-2880' }
                        },
                        {
                            width: 1440,
                            rename: { suffix: '-1440' }
                        },
                        {
                            width: 720,
                            rename: { suffix: '-720' }
                        }
                    ]
                },
                {
                    quality: 60,
                    compressionLevel: 6,
                    withMetadata: false,
                    errorOnEnlargement: false,
                    errorOnUnusedImage: false
                }
            )
        )
        .pipe(
            imagemin(
                [
                    // imagemin.gifsicle({ interlaced: true }),
                    /*
                    imageminJpegRecompress({
                        progressive: true,
                        method: 'smallfry',
                        quality: 'veryhigh'
                    }),*/
                    imagemin.optipng()
                    // imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
                ],
                { verbose: true }
            )
        )
        .pipe(gulp.dest('static/resized/'));
});
