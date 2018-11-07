<template>
    <div class="race">
        <makeItRain v-if="data.mattered && data.mattered.trim() !== ''" :burning="data.mattered !== 'true'" :show="shown" />

        <div :class="'raceInner'">
            <!-- ' + (expanded ? ' expanded' : ' collapsed') -->

            <div class="centralColumn">

                <social :data="{hed:data.hed,slug:data.slug,series:{slug:'where-money-mattered'}}" />

                <h1 class="raceHed" v-if="data.hed">{{data.hed}}</h1>

                <div class="candidates">

                    <div class="candidate" v-for="candidate in data.candidates">

                        <face :photo="candidate.photo" :color="(candidate.party == '' ? 'rgb(200,200,200)' : (candidate.party == 'Democrat' ? 'blue' : 'red'))" :opacity="candidate.winner === 'false' ? 0.5 : 1" />

                        <div class="wordRectangle">
                            <h4 class="candidateName">{{candidate.name}}</h4>

                            <div class="bigNumber">{{candidate.raised}}</div>

                            <div class="smallerLabel">raised</div>

                            <div class="bigNumber" v-if="candidate.outside_spending">{{candidate.outside_spending}}</div>

                            <div class="smallerLabel" v-if="candidate.outside_spending">independent spending</div>

                        </div>

                    </div>

                </div>
            </div>

            <byline :data="{authors:[data.reporter],published:true}" />

            <sections :data="data" />


            <!--

            <button class="btn expandButton" @click="expanded = true">Read more &darr;</button>

            <button class="btn closeButton" @click="expanded = false">Read less &uarr;</button>

            -->

        </div>

        <div class="scrim" @click="expanded = true"></div>
    </div>
</template>

<script>
import MakeItRain from '~/components/MakeItRain.vue';
import Face from '~/components/Face.vue';
import Copy from '~/components/Copy.vue';
import Byline from '~/components/Byline.vue';
import Sections from '~/components/Sections.vue';
import Social from '~/components/Social.vue';

export default {
    data() {
        return {
            expanded: false
        };
    },
    props: ['data','shown'],
    name: 'Races',
    components: {
        makeItRain: MakeItRain,
        Face,
        Copy,
        Byline,
        Sections,
        Social
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
.raceHed {
    font-family: "balboa",sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    color: black;
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
    padding-top: 5px;
    padding-bottom: 5px;
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
    /* max-width: 900px; */
    margin-right: auto;
    margin-left: auto;
    padding: 20px;
    padding-top: 40px;
    min-height: 100vh;
}
.candidateName {
    line-height: 120%;
    margin: 0;
    font-family: "nimbus-sans",sans-serif;
    /* text-align: center; */
    /* font-size: 90%; */
}
.collapsed .closeButton {
    display: none;
}
.expanded .expandButton {
    display: none;
}
.raceInner {
    position: relative;
    /* padding: 20px; */
    /* background-color: white; */
    overflow: hidden;
    padding-bottom: 30px;
}
.raceInner.collapsed {
    max-height: 300px;
    padding-bottom: 20px;
}
.expandButton, .closeButton {
    position: absolute;
    top: 250px;
    left: 50%;
    width: 100px;
    margin-left: -50px;
    z-index: 200;
    background-color: white;
    border-color: rgb(80,80,80);
}
.scrim {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 100;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,fafafa+100&0+0,1+74 */
    background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(251,251,251,1) 74%, rgba(250,250,250,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(251,251,251,1) 74%,rgba(250,250,250,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(251,251,251,1) 74%,rgba(250,250,250,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#fafafa',GradientType=0 ); /* IE6-9 */
}
.expanded .scrim {
    display: none;
}
.closeButton {
    position: absolute;
    top: auto;
    bottom: 0px;
}

@media (max-width: 650px) {
    .wordRectangle {
        padding-left: 0;
    }

    .bigNumber {
        font-size: 25px;
    }

    .candidateName {
        font-size: 90%;
    }
}
</style>