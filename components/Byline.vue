<template>
    <div class="byline centralColumn">
        <span v-if="!data.published">&mdash;</span><span v-if="data.published">by </span> <span v-for="(author,i) in data.authors"><strong v-html="author"></strong><span v-if="i !== data.authors.length-1">, </span></span><br>
        <span v-if="data.contributors"><span v-for="(contributor,i) in data.contributors"><strong v-html="contributor"></strong><span v-if="i !== data.contributors.length-1">, </span></span> contributed reporting</span>
        <div class="date">{{data.date}}</div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Byline'
};
</script>

<style>
.byline {
    font-family: "nimbus-sans",sans-serif;
    line-height: 22px;
    font-size: 18px;
    padding-bottom: 20px;
    color: black;
}
.byline a, .byline a:visited {
    color: black;
}
.date {
    font-size: 15px;
    line-height: 16px;
    color: rgb(150,150,150);
}
</style>