<template>
    <div>
        <div :class="'side ' + data.align" v-html="data.text"></div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Side'
};
</script>

<style>
.side {
    font-family: "nimbus-sans",sans-serif;
    font-size: 16px;
    width: 250px;
    float: right;
    padding-bottom: 10px;
    margin-right: 80px;
    margin-left: 10px;
    line-height: 132%;
    color: rgb(100,100,100);
}
.side a, .side a:visited {
    color: #E74C3C !important;
}
@media (max-width: 650px) {
    .side {
        width: 100%;
        float: none;
        margin-right: 0;
        margin-left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
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