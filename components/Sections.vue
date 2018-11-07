<template>
    <div style="z-index: 501;position: relative;top:0;left:0;background-color: rgba(250,250,250,0.7)">
        <div v-for="section in data.sections">
            <copy :data="section" v-if="section.type === 'text' || section.type === 'lede'" />

            <photo :base="'/where-money-mattered/'" :data="section" v-if="section.type === 'image'" />

            <snippet :data="section" v-if="section.type === 'snippet'" />

            <refer :data="section" v-if="section.type === 'refer'" />

            <side :data="section" v-if="section.type === 'side'" />

            <quote :data="section" v-if="section.type === 'quote'" />

            <list :data="section" v-if="section.type === 'list'" />

        </div>
    </div>
</template>

<script>
import Copy from '~/components/Copy.vue';
import Side from '~/components/Side.vue';
import Photo from '~/components/Photo.vue';
import Refer from '~/components/Refer.vue';
import Quote from '~/components/Quote.vue';
import Snippet from '~/components/Snippet.vue';
import List from '~/components/List.vue';

export default {
    components: {
        Side,
        Copy,
        Photo,
        Refer,
        Quote,
        Snippet,
        List
    },
    props: ['data'],
    name: 'Sections'
};
</script>

<style scoped>
.locator-left {
    width: 20%;
    float: left;
    clear: left;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

.locator-right {
    width: 20%;
    float: right;
    clear: right;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

@media (max-width: 650px) {
    .locator-left {
        width: 30%;
        float: left;
        clear: left;
        margin-right: 1.5% !important;
        margin-left: 1.5% !important;
    }

    .locator-right {
        width: 30%;
        float: right;
        clear: right;
        margin-right: 1.5% !important;
        margin-left: 1.5% !important;
    }
}
</style>