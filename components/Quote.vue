<template>
    <div class="centralColumn">
        <div class="quote">
            <div class="quoteText" v-html="'&ldquo;' + data.text + '&rdquo;'"></div>
            <!-- <div class="quoteAttrib">&mdash; {{data.credit}}</div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Quote'
};
</script>

<style scoped>
.quote {
    margin-left: 25px;
    width: 260px;
    float: right;
}
.quoteText {
    color: #E74C3C;
    font-family: adonis-web,serif;
    font-family: "baskerville-urw",serif;
    font-size: 38px;
    line-height: 38px;
    padding-top: 10px;
    padding-bottom: 20px;
    font-weight: 600;
}
.quoteAttrib {
    font-size: 17px;
    line-height: 130%;
}
@media (max-width: 650px) {
    .quote {
        width: 100%;
        float: none;
        margin-left: 0;
    }
    .quoteText {
        font-size: 30px;
        line-height: 35px;
    }
}
</style>