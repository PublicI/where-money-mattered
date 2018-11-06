const pkg = require('./package.json');
const axios = require('axios');

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        htmlAttrs: {
            lang: 'en-US'
        },
        title: 'Where money mattered',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: `/${pkg.name}/favicon.ico`
            }
        ]
    },
    modules: [
        '@nuxtjs/axios',
        [
            '@nuxtjs/google-analytics',
            {
                id: 'UA-3383794-4',
                debug: {
                    sendHitTask: !(
                        typeof document !== 'undefined' &&
                        document &&
                        document.referrer &&
                        document.referrer.indexOf('publicintegrity.org') !== -1
                    )
                }
            }
        ]
    ],
    plugins: [
        { src: '~/plugins/pym.js', ssr: false },
        { src: '~/plugins/typekit.js', ssr: false },
        { src: '~/plugins/chartbeat.js', ssr: false },
        { src: '~/plugins/swiper.js', ssr: false }
    ],
    axios: {
        host: process.env.HOST || 'localhost',
        prefix: `/${pkg.name}/`,
        port: process.env.PORT || 3000,
        https: true
    },
    generate: {
        minify: {
            collapseWhitespace: false,
            removeEmptyAttributes: false
        },
        routes: function() {
            let url = 'https://' + (process.env.HOST || 'localhost') + ':' + (process.env.PORT || 3000) + '/' + pkg.name + '/api/docs/index.json'
            return axios.get(url).then(res => {
                return res.data.races.map(race => {
                    return '/' + race.slug;
                });
            });
        }
    },
    router: {
        base: `/${pkg.name}/`
    },
    /*
     ** Global CSS
     */
    css: [
        '~/assets/css/site.css',
        '~/assets/css/main.css',
        'swiper/dist/css/swiper.css'
    ],
    serverMiddleware: [
        // API middleware
        '~/server/index.js'
    ],
    /*
     ** Add axios globally
     */
    build: {
        /*
         ** Run ESLINT on save
         */
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.(csv)$/,
                loader: 'dsv-loader',
                exclude: /(node_modules)/
            });

            if (ctx.isClient && process.env.NODE_ENV !== 'production') {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
