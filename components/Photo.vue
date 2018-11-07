<template>
    <div :class="(data.size ? data.size : 'centralColumn') + ' ' + data.align">
        <img :src="encodeURI(base + data.location)" style="width:100%;height: auto">

        <div class="cutline"><span>{{data.cutline}}</span><br><span class="credit" v-html="data.credit"></span></div>
    </div>
</template>

<script>
export default {
    props: ['data','base'],
    name: 'Photo'
};
</script>

<style scoped>
.bigger {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.cutline, .credit {
    font-family: "tablet-gothic-n2","tablet-gothic","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-family: "nimbus-sans",sans-serif;
    font-weight: 300;

    line-height: 18px;
    font-size: 15px;
    color: rgb(140,140,140);
    padding-bottom: 10px;
    padding-top: 5px;
}

.credit {
    font-size: 13px;
    line-height: 16px;
    color: rgb(160,160,160);
    padding-left: 15px;
}

.cutline .credit {
    padding-left: 0;
}

.left {
    width: 23%;
    float: left;
    clear: left;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

.right {
    width: 23%;
    float: right;
    clear: right;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

@media (max-width: 650px) {
    .left {
        width: 100%;
        float: none;
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .right {
        width: 100%;
        float: none;
        margin-right: 0 !important;
        margin-left: 0 !important;
    }
}
</style>