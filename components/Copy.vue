<template>
    <div :class="'copy centralColumn ' + data.type" style="z-index: 501;position: relative;top:0;left:0;background-color: rgba(250,250,250,0.7)">

        <h3 v-if="data.hed">{{data.hed}}</h3>

        <div v-html="'<p>' + data.text.replace(/\n\W*\n/g,'</p>\n<p>') + '</p>'" v-if="data.text">
        </div>

    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Sections'
};
</script>

<style>
.copy h3 {
    margin-bottom: 10px;
    margin-top: 30px;
}
.copy p {
    /*
    font-family: "ff-tisa-web-pro","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-family: MaisonNeue, Arial, Helvetica, Verdana, sans-serif; */
    font-family: "nimbus-sans",sans-serif;
    /* font-family: "franklin-gothic-condensed",sans-serif; */
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    color: rgb(50,50,50);
}
.copy h3 {
    font-family: "balboa",sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    color: black;
    text-shadow: none;
}
.lede p {
    /*
    line-height: 34px;
    font-size: 25px;
    */
}
.lede p:first-child:first-letter {
    color: #E74C3C;
    float: left;
    font-family: Georgia,serif;
    font-size: 56px;
    line-height: 47px;
    padding-top: 2px;
    padding-right: 5px;
    padding-left: 0;
}
a:visited {
    color: #E74C3C;
}
a {
    text-decoration: none;
    color: #E74C3C;
}
</style>