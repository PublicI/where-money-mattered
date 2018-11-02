<template>
    <div class="partner centralColumn" v-html="data.text"></div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Partner'
};
</script>

<style>
.partner {
    width: 250px;
    float: right;
    padding-bottom: 10px;
    margin-right: 80px;
    margin-left: 10px;
    line-height: 132%;
}
@media (max-width: 650px) {
    .partner {
        width: 100%;
        float: none;
        margin-right: 0;
        margin-left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
}
</style>