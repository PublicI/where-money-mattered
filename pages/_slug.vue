<template>
    <section>
        <div v-if="doc">
            <projectNav :data="doc.series" />

            <ledeArt :data="doc" />

            <social :data="doc" />

            <byline :data="doc" />

            <div class="partner centralColumn" v-if="doc.partner">{{doc.partner}}</div>

            <sections :data="doc" />

            <parts :data="doc.series" />
        </div>
    </section>
</template>

<script>
import Logo from '~/components/Logo.vue';
import Nav from '~/components/Nav.vue';
import LedeArt from '~/components/LedeArt.vue';
import Sections from '~/components/Sections.vue';
import Byline from '~/components/Byline.vue';
import Social from '~/components/Social.vue';
import Hed from '~/components/Hed.vue';
import Parts from '~/components/Parts.vue';

export default {
    name: 'slug',
    components: {
        Logo,
        projectNav: Nav,
        ledeArt: LedeArt,
        Sections,
        Byline,
        Social,
        Hed,
        Parts
    },
    async asyncData ({ app, params }) {
        let data = await app.$axios.$get(`/api/docs/${params.slug}.json`);
        
        return {
            doc: data
        };
    },
    head () {
        return {
            title: `${this.doc.hed} | Center for Public Integrity`,
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
                    content: this.doc.subhed + '.'
                },
                {
                    name: 'twitter:image',
                    content: this.doc.featured ? `https://apps.publicintegrity.org/${this.doc.series.slug}/${encodeURI(this.doc.featured.location.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1'))}` : `https://apps.publicintegrity.org/${this.doc.series.slug}/${encodeURI(this.doc.image.location.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1'))}`
                },
                {
                    property: 'og:image',
                    content: this.doc.featured ? `https://apps.publicintegrity.org/${this.doc.series.slug}/${encodeURI(this.doc.featured.location.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1'))}` : `https://apps.publicintegrity.org/${this.doc.series.slug}/${encodeURI(this.doc.image.location.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1'))}`
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
                    content: this.doc.subhed
                },
                {
                    property: 'og:url',
                    content: `https://apps.publicintegrity.org/${this.doc.series.slug}/${this.doc.slug}/`
                }]
        };
    }
};
</script>

<style>
.partner {
    color: rgb(150,150,150);
    font-style: italic;
    margin-bottom: 20px;
    line-height: 120%;
    font-size: 90%;
}
</style>

