<template>
    <div :class="(data.size ? data.size : 'centralColumn') + ' ' + data.align">
        <img :src="data.location" style="width:100%;height: auto"><br>

        <div class="cutline">{{data.cutline}}&nbsp;&nbsp;<span class="credit" v-html="data.credit"></span></div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Snippet'
};
</script>

<style scoped>
.cutline, .credit {
    font-family: "tablet-gothic-n2","tablet-gothic","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 300;

    line-height: 18px;
    font-size: 15px;
    color: rgb(100,100,100);
    padding-bottom: 10px;
    padding-top: 5px;
}

.credit {
    font-size: 13px;
    line-height: 16px;
    color: rgb(120,120,120);
    padding-left: 15px;
}

.cutline .credit {
    padding-left: 0;
}

img {
    border:2px solid rgb(200,200,200);
    border-radius: 2px;
}
</style>