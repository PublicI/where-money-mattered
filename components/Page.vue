<template>
    <div>
        <logo />

        <race v-if="swiperOption.initialSlide !== 0 && !showSwiper" :data="doc.races[swiperOption.initialSlide-1]" />

        <div v-if="showSwiper" v-swiper:mySwiper="swiperOption" ref="pageSwiper" @slideChange="slideChanged">
            <div class="swiper-pagination swiper-pagination-bullets"></div>
            <div class="swiper-wrapper">
                <div class="swiper-slide" data-history="/">

                    <ledeArt :data="doc" :shown="currentIndex === 0" />

                    <social :data="doc" />

                    <byline :data="doc" />

                    <sections :data="doc" />

                    <div class="centralColumn" style="text-align: right;">
                        <h4><div @click="slideNext" style="border:1px solid black;border-radius:3px;color:black;padding: 10px;display: inline-block;cursor:pointer;">Next ➡️</div></h4>
                        <br>
                    </div>
                </div>

                <div v-for="(race,i) in doc.races" :data-history="race.slug" class="swiper-slide">

                    <race :data="race" :shown="(currentIndex-1) === i" />

                    <div class="centralColumn" style="text-align: right;">
                        <h4><div disabled="true" @click="slideNext" style="border:1px solid black;border-radius:3px;color:black;padding: 10px;display: inline-block;cursor:pointer;"  v-if="i+1 < doc.races.length">Next ➡️</div><div style="border:1px solid black;border-radius:3px;color:black;padding: 10px;display: inline-block"  v-if="i+1 == doc.races.length">Complete ✅</div></h4>
                        <br>
                    </div>
                </div>

            </div>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </div>
    </div>
</template>

<script>
import Race from '~/components/Race.vue';
import Hed from '~/components/Hed.vue';
import Logo from '~/components/Logo.vue';
import Sections from '~/components/Sections.vue';
import Byline from '~/components/Byline.vue';
import Social from '~/components/Social.vue';
import Parts from '~/components/Parts.vue';
import LedeArt from '~/components/LedeArt.vue';
import MakeItRain from '~/components/MakeItRain.vue';

export default {
    props: ['doc','slug'],
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
            if (!this.$refs || !this.$refs.pageSwiper) {
                return null;
            }
            return this.$refs.pageSwiper;
        },
        swiper() {
            if (!this.swiperComponent || !this.swiperComponent.swiper) {
                return null;
            }
            return this.swiperComponent.swiper;
        }
    },
    mounted() {
        let vm = this;

        this.showSwiper = true;
    },
    methods: {
        slideChanged() {
            this.currentIndex = this.swiper.activeIndex;
        },
        slideNext(e) {
            if (this.swiper) {
                this.swiper.slideNext();
                if (window && window.scrollTo) {
                    window.scrollTo(0,0);
                }
            }
        }
    },
    data() {
        let data = this.doc;

        let initialSlide = 0;

        if (data.races && this.slug) {
            let slugs = data.races.map(race => race.slug);

            initialSlide = slugs.indexOf(this.slug)+1;
        }

        return {
            currentIndex: initialSlide,
            showSwiper: false,
            swiperOption: {
                keyboard: {
                    enabled: true,
                },
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
    background: rgb(120,120,120);
    opacity: 0.5;
    cursor: pointer;
}
.swiper-pagination-bullet-active {
    background: black;
    opacity: 1;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20stroke%3D'%23666666'%20fill%3D'%23333333'%2F%3E%3C%2Fsvg%3E");
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20stroke%3D'%23666666'%20fill%3D'%23333333'%2F%3E%3C%2Fsvg%3E");
}

.swiper-button-next, .swiper-container-rtl .swiper-button-prev, .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    position: fixed;
    top: 50%;
    -webkit-tap-highlight-color: transparent;
}

@media (max-width: 600px) {
    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 3px;
    }
    .swiper-pagination-bullet {
        width: 4px;
        height: 4px;
    }

    .swiper-button-prev, .swiper-button-next {
        width: 13.5px;
        height: 22px;
        margin-top: -20px;
        z-index: 501;
        cursor: pointer;
        background-color: rgb(250,250,250);
        background-size: 13.5px 22px;
    }

    .swiper-button-next, .swiper-container-rtl .swiper-button-prev, .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
        position: absolute;
        top: 30px;
    }

}
</style>
