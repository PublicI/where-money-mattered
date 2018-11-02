<template>
    <div>
        <div class="ledeArt">
            <div class="scrimContainer">
                <img v-if="data.image.location !== ''" :src="encodeURI((data.series ? '/' + data.series.slug + '/' : '') + data.image.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1'))" :srcset="encodeURI((data.series ? '/' + data.series.slug + '/' : '') + data.image.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1')) + '  2880w, ' + (data.series ? '/' + data.series.slug + '/' : '') + encodeURI(data.image.location.replace('img','resized').replace(/\.(jpg|png)$/,'-1440.$1')) + '  1440w, ' + (data.series ? '/' + data.series.slug + '/' : '') + encodeURI(data.image.location.replace('img','resized').replace(/\.(jpg|png)$/,'-720.$1')) + '   720w'" />

                <div class="scrim"></div>
            </div>

            <div class="cutline" v-if="data.image.cutline">{{data.image.cutline}}</div><div class="credit">{{data.image.credit}}</div>

            <hed :data="data" />


        </div>

    </div>
</template>

<script>
import Hed from '~/components/Hed.vue';

export default {
    components: {
        Hed
    },
    props: ['data'],
    name: 'LedeArt'
};
</script>

<style scoped>
.scrimContainer {
    position: relative;
}

.ledeArt {
    /* max-height: 900px; */
    /* min-height: 900px; */
    overflow: hidden;
}

.cutline, .credit {
    font-family: "tablet-gothic-n2","tablet-gothic","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-family: "nimbus-sans",sans-serif;
    font-weight: 300;

    line-height: 18px;
    font-size: 15px;
    color: rgb(100,100,100);
    padding-top: 5px;
    padding-left: 20px;
}

.credit {
    font-size: 14px;
    line-height: 16px;
    color: rgb(120,120,120);
}

.cutline .credit {
    padding-left: 0;
}
.ledeArt {
    position: relative;
}
/*
.hed {
    position: absolute;
    bottom: 20px;
    left: 20px;
}*/
img {
    width: 100%;
    height: auto;
    /* opacity: 0.7; */
}
.scrim {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 500;

    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#244671+0,000000+100&0.76+9,0+53 */
    background: -moz-linear-gradient(-45deg, rgba(36,70,113,0.76) 0%, rgba(33,64,103,0.76) 9%, rgba(17,33,53,0) 53%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(-45deg, rgba(36,70,113,0.76) 0%,rgba(33,64,103,0.76) 9%,rgba(17,33,53,0) 53%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(135deg, rgba(36,70,113,0.76) 0%,rgba(33,64,103,0.76) 9%,rgba(17,33,53,0) 53%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c2244671', endColorstr='#00000000',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
.hideOnDesktop {
    display: none;
}
@media (max-width: 650px) {
    /*
    .hed {
        position: relative;
        bottom: 0;
        left: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }*/
    .scrim {
        display: none;
    }
    .credit, .cutline {
        padding-left: 10px;
    }
    .hideOnMobile {
        display: none;
    }
    .hideOnDesktop {
        display: block;
    }
}
</style>