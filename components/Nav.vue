<template>
    <div class="nav">
        <logo />

        <!--

        <ul :class="(expanded ? 'expanded' : 'hideOnMobile')">
            <li class="series"><nuxt-link :to="{ name: 'index' }" :class="'series' + ($route.path === '/' ? ' current' : '')">{{data.name}}</nuxt-link></li>
            <li v-for="part in data.parts" v-if="(!part.nav || part.nav !== 'false') && (!part.live || part.live !== 'false')"><nuxt-link :to="{ name: 'slug', params: { slug: part.slug } }" :class="'chapter' + (part.slug == $route.params.slug ? ' current' : '')">{{part.name}}</nuxt-link></li>
            <li v-for="part in data.parts" v-if="(!part.nav || part.nav !== 'false') && (part.live && part.live === 'false')"><span class="chapter notLive">{{part.name}}</span></li>
        </ul>

        <div class="menu hideOnDesktop" @click="expanded = !expanded">
            <svg fill="black" width="30" height="30" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="m 13.999999,972.36216 c -2.2091,0 -4.0000005,1.79079 -4.0000005,4 0,2.2092 1.7909005,4 4.0000005,4 l 72.000002,0 c 2.209101,0 4,-1.7908 4,-4 0,-2.20921 -1.790899,-4 -4,-4 z m 0,26.00005 c -2.2091,0 -4.0000005,1.79069 -4.0000005,3.99999 0,2.2092 1.7909005,4 4.0000005,4 l 72.000002,0 c 2.209101,0 4,-1.7908 4,-4 0,-2.2093 -1.790899,-3.99999 -4,-3.99999 z m 0,25.99999 c -2.2091,0 -4.0000005,1.7908 -4.0000005,4 0,2.2092 1.7909005,4 4.0000005,4 l 72.000002,0 c 2.209101,0 4,-1.7908 4,-4 0,-2.2092 -1.790899,-4 -4,-4 z" style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;" fill="black" fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg>
        </div>

        -->
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
    components: {
        Logo
    },
    data() {
        return {
            expanded: false
        };
    },
    props: ['data'],
    name: 'Nav'
};
</script>

<style scoped>
.menu {
    position: absolute;
    right: 7px;
    top: 5px;
    cursor: pointer;
}
.logo {
    display: inline-block;
}
.nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
    /* color: white; */
    /*
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;*/
    font-size: 16px;
    line-height: 130%;
    background-color: transparent;
    width: 100%;
}
.series {
    /* font-family: adonis-web,serif; */
    font-size: 17px;
    font-family: "balboa",sans-serif;
    text-transform: uppercase;
}
.chapter {
    /* font-family: almaq-refined,sans-serif; */
    font-family: "balboa",sans-serif;
    /* text-transform: uppercase; */
}
ul {
    position: absolute;
    top: 0;
    display: inline-block;
    list-style-type: none;
    padding-bottom: 0;
    margin-bottom: 0;
}
li {
    border-left-width: 0;
    display: inline-block;
}
a, a:visited, span {
    padding: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    display: inline-block;
    color: black;
}

a, a:visited {
    cursor: pointer;
}

.notLive {
    color: rgb(180,180,180);
}
a.current, a.current:visited {
    color: #E74C3C;
}
.hideOnDesktop {
    display: none;
}
@media (max-width: 1124px) {
    /*
    .nav {
        padding-top: 20px;
        padding-left: 0;
        padding-left: 35px;
    }*/
    ul {
        position: relative;
        display: block;
    }
    li {
        display: block;
    }
    a, a:visited, span {
        padding: 5px;
    }
    .hideOnMobile {
        display: none;
    }
    .hideOnDesktop {
        display: inline-block;
    }
}
</style>