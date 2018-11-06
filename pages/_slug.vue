<template>
    <div v-if="doc">
        <page :doc="doc" :slug="slug" />
    </div>
</template>

<script>
import Page from '~/components/Page.vue';

export default {
    name: 'index',
    components: {
        Page
    },
    async asyncData ({ app, params }) {
        let data = await app.$axios.$get('/api/docs/index.json');

        return {
            slug: params.slug,
            doc: data
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
</style>
