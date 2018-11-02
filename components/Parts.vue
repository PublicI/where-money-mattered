<template>
    <div class="parts">
        <nuxt-link :to="{ name: 'slug', params: { slug: part.slug } }" class="part" v-for="part in data.parts" :key="part.slug" :style="'background-image:url(/' + data.slug + '/' + encodeURI(part.image.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1')) + ');background-size:cover'" v-if="(!part.nav || part.nav !== 'false') && (!part.live || part.live !== 'false')">
                <div class="text">
                    <h2>{{part.hed}}</h2>
                    <h1>{{part.name}}</h1>
                </div>
        </nuxt-link>

        <div class="part" v-for="part in data.parts" :key="part.slug" v-if="(!part.nav || part.nav !== 'false') && (part.live && part.live === 'false')">
                <div class="text">
                    <h2 class="notLive">{{part.date}}</h2>
                    <h1 class="notLive">{{part.name}}</h1>
                </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Parts'
};
</script>

<style>
.parts {
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
}
.part .image {
    width: auto;
    height: 100%;
}
.part a .image {
    cursor: pointer;
}
.part {
    display: block;
    height: 270px;
    width: 30%;
    position: relative;
    margin-bottom: 20px;
    float: left;
    margin: 1%;
    overflow: hidden;
    border: 1px solid black;
}
.part .text {
    position: absolute;
    bottom: 0;
    left: 10px;
    padding: 20px;
    font-family: "nimbus-sans",sans-serif;
}
.part .text h1 {
    font-size: 30px;
    line-height: 110%;
    color: black;
    padding: 4px;
    background-color: white;
    font-family: "balboa",sans-serif;
    text-transform: uppercase;
}
.part .text h2 {
    font-size: 18px;
    line-height: 120%;
    background-color: white;
    display: inline-block;
    padding: 4px;
    font-family: "nimbus-sans",sans-serif;
}
.notLive {
    color: rgb(180,180,180) !important;
}
a.part:hover .text h2, a.part:hover .text h1 {
    text-decoration: underline;
    text-decoration-color:#E74C3C;
}

@media (max-width: 900px) {
    .part {
        width: 98%;
        float: none;
    }
    .part .image {
        width: 100%;
        height: auto;
    }
}
</style>

