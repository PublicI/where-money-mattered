<template>
        <div class="refer centralColumn" v-html="data.text"></div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Refer'
};
</script>

<style>
.refer {
    font-size: 25px;
    /*
    width: 100%;
    float: none;
    margin-right: 0;
    margin-left: 0;
    padding-left: 10px;
    padding-right: 10px;*/
    /* 
    width: 250px;
    float: right;
    padding-bottom: 10px;
    margin-right: 80px;
    margin-left: 10px; */
    padding-bottom: 20px;
    line-height: 110%;
    color: rgb(100,100,100);
    font-family: "nimbus-sans",sans-serif;
}
.refer a, .refer a:visited {
    color: #E74C3C !important;
}
@media (max-width: 650px) {
    /*
    .refer {
        width: 100%;
        float: none;
        margin-right: 0;
        margin-left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }*/
}
</style>