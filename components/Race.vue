<template>
    <div class="race">
        <makeItRain :burning="true" />

        <div class="copy centralColumn">

            <h3 v-if="data.hed">{{data.hed}}</h3>

            <h3>{{data.state}} {{data.chamber === 'S' ? 'Senate' : data.district}}</h3>

            <div class="candidates">

                <div class="candidate" v-for="candidate in data.candidates">

                    <face :photo="candidate.photo" :color="(candidate.party == 'Democrat' ? 'blue' : 'red')" :opacity="candidate.winner === 'false' ? 0.5 : 1" />

                    <div class="wordRectangle">
                        <h4 class="candidateName">{{candidate.name}}</h4>

                        <div class="bigNumber">{{candidate.raised}}</div>

                        <div class="smallerLabel">raised</div>

                    </div>

                </div>

            </div>

            <!--
            <div v-html="'<p>' + data.text.replace(/\n\W*\n/g,'</p>\n<p>') + '</p>'" v-if="data.text">
            </div>

            <span class="byline"><span>&mdash; </span><strong v-html="data.reporter"></strong></span>

            -->
        </div>

    </div>
</template>

<script>
import MakeItRain from '~/components/MakeItRain.vue';
import Face from '~/components/Face.vue';

export default {
    props: ['data'],
    name: 'Races',
    components: {
        makeItRain: MakeItRain,
        Face
    }
};
</script>

<style scoped>
.wordRectangle {
    float: left;
    padding-left: 15px;
}
.photoCircle {
    width:115px;
    height:115px;
    overflow:hidden;
    position: relative;
    float: left;
}
.candidates:after, .candidate:after {
    content: "";
    clear: both;
    display: table;
}
.candidates {
    padding-bottom: 15px;
}
.candidate {
    width:50%;
    float: left;
}
.bigNumber {
    font-family: "balboa",sans-serif;
    font-size: 30px;
}
.smallerLabel {
    font-family: "nimbus-sans",sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    line-height: 17px;
}
.race {
    position: relative;
    /* border: 5px solid black; */
    background-color: rgb(250,250,250);
    max-width: 900px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 10px;
    padding: 20px;
}
.candidateName {
    line-height: 120%;
    /* text-align: center; */
    /* font-size: 90%; */
}
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
    font-size: 19px;
    line-height: 25px;
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
@media (max-width: 650px) {
    .wordRectangle {
        padding-left: 0;
    }
}
</style>