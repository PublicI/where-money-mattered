<template>
    <div v-if="doc">
        <logo />

        <race v-if="swiperOption.initialSlide !== 0 && !showSwiper" :data="doc.races[swiperOption.initialSlide-1]" />

        <div v-if="showSwiper" v-swiper:mySwiper="swiperOption" ref="pageSwiper">
            <div class="swiper-pagination swiper-pagination-bullets"></div>
            <div class="swiper-wrapper">
                <div class="swiper-slide" data-history="">

                    <ledeArt :data="doc" />

                    <social :data="doc" />

                    <byline :data="doc" />

                    <sections :data="doc" />

                </div>

                <div v-for="race in doc.races" :data-history="race.hed" class="swiper-slide">

                    <race :data="race" />

                </div>

            </div>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </div>
    </div>
</template>

<script>
import Race from '~/components/Race.vue';
import Races from '~/components/Races.vue';
import Hed from '~/components/Hed.vue';
import Logo from '~/components/Logo.vue';
import Sections from '~/components/Sections.vue';
import Byline from '~/components/Byline.vue';
import Social from '~/components/Social.vue';
import Parts from '~/components/Parts.vue';
import LedeArt from '~/components/LedeArt.vue';
import MakeItRain from '~/components/MakeItRain.vue';

export default {
    name: 'index',
    components: {
        Hed,
        Logo,
        Sections,
        Byline,
        Social,
        ledeArt: LedeArt,
        Parts,
        Race
    },
    computed: {
        swiperComponent() {
            return this.$refs.pageSwiper;
        },
        swiper() {
            return this.swiperComponent.swiper;
        }
    },
    mounted() {
        this.showSwiper = true;
    },
    async asyncData ({ app, params }) {
        let data = await app.$axios.$get('/api/docs/index.json');

        let initialSlide = 0;

        if (data.races && params.slug) {
            let slugs = data.races.map(race => race.slug);

            initialSlide = slugs.indexOf(params.slug)+1;
        }

        return {
            showSwiper: false,
            doc: data,
            swiperOption: {
                history: {
                    key: ''
                },
                autoHeight: true,
                pagination: {
                    clickable: true,
                    el: '.swiper-pagination'
                },
                initialSlide,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        };
    },
    head () {
        return {
            title: this.doc.hed + ' | Center for Public Integrity',
            meta: [
                {
                    name: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    property: 'og:type',
                    content: 'article'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.doc.description
                },
                {
                    name: 'twitter:image',
                    content: `https://apps.publicintegrity.org/${this.doc.slug}/${encodeURI(this.doc.featured.location.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1'))}`
                },
                {
                    property: 'og:image',
                    content: `https://apps.publicintegrity.org/${this.doc.slug}/${encodeURI(this.doc.featured.location.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1'))}`
                },
                {
                    property: 'article:modified_time',
                    content: this.doc.published
                },
                {
                    property: 'article:published_time',
                    content: this.doc.published
                },
                {
                    property: 'og:title',
                    content: this.doc.hed 
                },
                {
                    name: 'title',
                    content: this.doc.hed
                },
                {
                    property: 'og:description',
                    content: this.doc.description
                },
                {
                    property: 'og:url',
                    content: `https://apps.publicintegrity.org/${this.doc.slug}/`
                }]
        };
    }
};
</script>

<style>
.swiper-button-disabled {
    display: none;
}

.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: initial;
    top: 0px;
    z-index: 500;
}

.swiper-pagination-bullet {
    background: black;
    opacity: 0.3;
    cursor: pointer;
}
.swiper-pagination-bullet-active {
    background: black;
    opacity: 1;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20stroke%3D'%23000000'%20fill%3D'%23FFFFFF'%2F%3E%3C%2Fsvg%3E");
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20stroke%3D'%23000000'%20fill%3D'%23FFFFFF'%2F%3E%3C%2Fsvg%3E");
}

.swiper-button-next, .swiper-container-rtl .swiper-button-prev, .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    position: fixed;
    top: 50vh;
    -webkit-tap-highlight-color: transparent;
}
</style>
