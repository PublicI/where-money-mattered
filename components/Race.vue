<template>
    <div class="race">
        <makeItRain :burning="true" />

        <div class="copy centralColumn">

            <h3 v-if="data.hed">{{data.hed}}</h3>

            <h3>{{data.state}} {{data.chamber === 'S' ? 'Senate' : data.district}}</h3>

            <div class="candidates">

                <div class="candidate">

                    <div :style="'background-color:' + (data.cand1_party == 'Democrat' ? 'blue' : 'red') + ';opacity:' + (data.winner !== 'cand1' ? '0.5' : '1')" class="photoCircle">
                        <img :src="'img/portraits/cobbed/' + data.cand1_photo.replace(/ /g,'_').replace('.jpg','.png')"  style="height:110px;width: auto;filter:grayscale(50%) saturate(0%);opacity:0.9;position: absolute;bottom:0;left:15px"/>

                        <img src="img/circle.png" style="width:100%;height: auto;position: absolute;top:0;left:0"/>
                    </div>

                    <div class="wordRectangle">
                        <h4 class="candidateName">{{data.cand1_name}}</h4>

                        <div class="bigNumber">{{data.cand1_raised}}</div>

                        <div class="smallerLabel">raised</div>

                    </div>

                </div>

                <div class="candidate">

                    <div :style="'background-color:' + (data.cand2_party == 'Democrat' ? 'blue' : 'red') + ';opacity:' + (data.winner !== 'cand2' ? '0.5' : '1')" class="photoCircle">
                        <img :src="'img/portraits/cobbed/' + data.cand2_photo.replace(/ /g,'_').replace('.jpg','.png')"  style="height:110px;width: auto;filter:grayscale(50%) saturate(0%);opacity:0.9;position: absolute;bottom:0;left:15px"/>

                        <img src="img/circle.png" style="width:100%;height: auto;position: absolute;top:0;left:0"/>
                    </div>

                    <div class="wordRectangle">

                        <h4 class="candidateName">{{data.cand2_name}}</h4>

                        <div class="bigNumber">{{data.cand2_raised}}</div>

                        <div class="smallerLabel">raised</div>

                    </div>
                </div>

            </div>

            <div v-html="'<p>' + data.text.replace(/\n\W*\n/g,'</p>\n<p>') + '</p>'" v-if="data.text">
            </div>

            <span class="byline"><span>&mdash; </span><strong v-html="data.reporter"></strong></span>

        </div>

    </div>
</template>

<script>
import MakeItRain from '~/components/MakeItRain.vue';

export default {
    props: ['data'],
    name: 'Races',
    components: {
        makeItRain: MakeItRain
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
    border: 5px solid black;
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
</style>