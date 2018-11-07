<template>
    <div class="race">
        <makeItRain v-if="data.mattered && data.mattered.trim() !== ''" :burning="data.mattered !== 'true'" :show="shown" />

        <div :class="'raceInner'">
            <!-- ' + (expanded ? ' expanded' : ' collapsed') -->

            <div class="centralColumn">

                <h1 class="raceHed" v-if="data.hed">{{data.hed}}</h1>

                <h4 class="mattered" v-if="data.mattered && data.mattered === 'true'">Money mattered!</h4>
                <h4 class="mattered" v-if="data.mattered && data.mattered === 'false'">Money didn't matter!</h4>

                <div class="candidates">

                    <div class="candidate" v-for="candidate in data.candidates">

                        <face :photo="candidate.photo" :color="(candidate.party == '' ? 'rgb(200,200,200)' : (candidate.party == 'Democrat' ? 'blue' : 'red'))" :opacity="candidate.winner === 'false' ? 0.5 : 1" />

                        <div class="wordRectangle">
                            <h4 class="candidateName">{{candidate.name}}
                            <svg style="position: relative;top:5px;left:-5px" fill="#ff9c34" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" width="20" height="20" v-if="candidate.winner === 'true'"><polygon points="71.4682541,60.9639282 71.3040695,62.7420425 67.9358139,62.1851082 66.2339783,61.9037933 65.6969452,63.5443535   64.6368561,66.7825546 61.4806175,65.4990616 59.8827209,64.8490448 58.9966354,66.3295593 57.2443771,69.2567139   54.4490891,67.3012238 53.0316658,66.3096466 51.8347931,67.5571976 49.4710426,70.020752 47.183567,67.486351   46.0272865,66.2051926 44.5853004,67.1530685 41.7354546,69.0263367 40.0685234,66.0508347 39.2232895,64.5423965   37.607811,65.1461334 34.4146004,66.3396454 33.4486198,63.0706749 32.9596863,61.4158936 31.2472458,61.6462669   27.8663197,62.1010742 16.7829056,84.5135345 32.4544601,80.7357254 38.6570473,95.230835 49.9486008,72.3976898   61.2398987,95.230835 67.442482,80.7357254 83.1140366,84.5135345 "></polygon><path d="M23.0180683,37.8171577l-2.5512066,3.6467247l3.8181496,2.2843742l-1.6762409,4.1222153l4.2305508,1.3863983  l-0.7247429,4.3900833l4.4327469,0.4090385l0.145052,2.330658l0.1313477,2.110878l4.4110279-0.5933914l1.2607346,4.2659721  l4.1679802-1.5578194l2.176815,3.8856354l3.7193794-2.4446831l2.9824829,3.3043938l3.0809975-3.2113113l3.6472397,2.5514679  l2.285408-3.8181534l4.1217003,1.6762428l1.3851013-4.2313271l4.3913803,0.7260361l0.3250046-3.5246849l0.0837784-0.908062  l4.4410172-0.2758827l-0.5939102-4.4118042l4.2701111-1.2599602l-1.5604095-4.1710815l3.8856354-2.1742287l-2.4451981-3.7193794  l3.3046494-2.9830017l-3.2115707-3.0822906l2.5543137-3.6459484l-3.8212509-2.2843723l1.676239-4.1227341l-4.2300339-1.3858795  l0.7249985-4.3921509l-4.4324875-0.4067135l-0.2761383-4.4428301l-4.412323,0.5939112L63.476181,8.1844196l-4.1679802,1.5604076  l-2.1747437-3.8843408l-3.7206726,2.4431291L50.4300385,5L47.348011,8.2110519l-3.6459503-2.5527592l-2.284893,3.8191833  l-4.1232491-1.6741729l-1.3845863,4.2279658l-4.3926678-0.7239666l-0.4077492,4.4314528L26.66712,16.0167065l0.5941715,4.4107685  l-4.2685604,1.2599602l1.5591145,4.1700497l-3.8843422,2.1742268l2.4444237,3.720932l-3.3049088,2.9819679L23.0180683,37.8171577z   M50.3708305,18.8745651c9.0661316,0,16.415432,7.3492985,16.415432,16.415432c0,9.065876-7.3493004,16.415432-16.415432,16.415432  s-16.415432-7.349556-16.415432-16.415432C33.9553986,26.2238636,41.3046951,18.8745651,50.3708305,18.8745651z"></path></svg>

                            </h4>

                            <div class="bigNumber">{{candidate.raised}}</div>

                            <div class="smallerLabel">raised</div>

                            <div class="bigNumber" v-if="candidate.outside_spending">{{candidate.outside_spending}}</div>

                            <div class="smallerLabel" v-if="candidate.outside_spending">independent spending</div>

                        </div>

                    </div>

                </div>

                <div class="source" v-if="data.source">Source: <span v-html="data.source"></span></div>
            </div>

            <social :data="{tweet:'Did money matter in the election for ' + data.hed + '?',slug:data.slug,series:{slug:'where-money-mattered'}}" />

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
.source {
    font-size: 14px;
    line-height: 16px;
    color: rgb(150,150,150);
    padding-bottom: 15px;
}
.mattered {
    margin: 0;
}
.wordRectangle {
    float: left;
    padding-left: 10px;
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
    margin: 0;
}
.candidates:after, .candidate:after {
    content: "";
    clear: both;
    display: table;
}
.candidates {
    padding-top: 5px;
    padding-bottom: 15px;
}
.candidate {
    padding-top: 10px;
    width:50%;
    float: left;
}
.bigNumber {
    font-family: "balboa",sans-serif;
    font-size: 30px;
    padding-top: 5px;
    padding-bottom: 0;
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
    /* min-height: 100vh; */
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
    /* padding-bottom: 20px; */
}
.raceInner.collapsed {
    max-height: 300px;
    /* padding-bottom: 20px; */
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
    height: 50px;
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

    .race {
        padding: 0;
        padding-top: 40px;
        /* padding-bottom: 20px; */
    }
}
</style>