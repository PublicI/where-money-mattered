<template>
    <div>
        <div :class="'hed' + (data.image.location !== '' ? ' floatedHed' : '')">
            <div style="height: 100%">
                <h4 v-if="data.series"><span class="smaller">{{data.part}}</span><br><nuxt-link :to="{ name: 'index' }" class="project">{{data.series.hed.toUpperCase()}}</nuxt-link></h4>

                <h1 v-if="data.series && data.slug !== data.series.slug">{{data.hed}}</h1>
                <div v-if="!data.series || data.slug === data.series.slug" style="height: 100%">
                    <div class="hedBox mattered">
                        <div class="projectHedContainer">
                            <h1 class="projectHed outline">Where</h1>
                            <h1 class="projectHed outline">money</h1>
                            <h1 class="projectHed outline">mattered</h1>
                        </div>

                        <makeItRain :burning="false" />
                    </div>
                    <div class="hedBox nothingMatters">
                        <div class="projectHedContainer">
                            <h1 class="projectHed outline">and </h1>
                            <h1 class="projectHed outline">where it</h1>
                            <h1 class="projectHed outline">didn't</h1>
                        </div>

                        <makeItRain :burning="true" />
                    </div>
                </div>

                <h2>{{data.subhed}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
// import FontFaceObserver from 'fontfaceobserver';
// import fitty from 'fitty';
import MakeItRain from '~/components/MakeItRain.vue';

export default {
    props: ['data'],
    name: 'Hed',
    data() {
        return {
            rotatedClass: 'notRotated'
        }
    },
    components: {
        makeItRain: MakeItRain
    }
    /*,
    mounted() {
        let vm = this;

        vm.$nextTick(() => {
            var font = new FontFaceObserver('balboa', {
                weight: 400
            });

            font.load().then(() => {
                fitty('.projectHed');
            }, () => {
                // console.log('Font is not available');
            });
        });
    }*/
};
</script>

<style scoped>
.floatedHed {
    position: absolute;
    top: 5vw;
    left: 5vw;
    z-index: 600;
    max-width: 48%;
}
.floatedHed h1 {
    /* text-shadow: 1px 1px 1px #565656; */
    color: white;
    /* text-shadow: 1px 1px 1px #000000; */
}
.hedBox {
    width:50%;
    height: 100%;
    float: left;
    /* padding: 4%; */
    position: relative;
    background-color:#63892c;
    color:white;
    border-right:1px solid white;
    /* padding-top: 8%;
    padding-bottom: 8%; */
    display: table;
}
.hed {
    height: 90vh;
}
.mattered {
    /* background-image: url('~assets/map.png'); */
    background-size: cover;
    background-position: 10% 20%;
    background-color: white;
    border: 2px solid black;
    /* background-color: #63892c; */
}
.nothingMatters {
    /* background-image: url('~assets/inverted-map.png'); */
    background-size: cover;
    background-position: 90% 20%;
    background-color: black;
    /* background-color: black; */
}
.nothingMatters .projectHed {
    color: white; 
}
/*
.mattered .outline {
    text-shadow:
   -1px -1px 0 #63892c,  
    1px -1px 0 #63892c,
    -1px 1px 0 #63892c,
     1px 1px 0 #63892c;
}
.nothingMatters .outline {
    text-shadow:
   -1px -1px 0 black,  
    1px -1px 0 black,
    -1px 1px 0 black,
     1px 1px 0 black;
}*/
.smaller {
    font-size: 80%;
}
.hideOnDesktop {
    display: none;
}
.projectHedContainer {
    display: table-cell;
    vertical-align: middle;
}
.projectHed {
    text-transform: uppercase;
    font-size:11vw;
    line-height: 0.90;
    margin: 0;
    padding: 0;
    /* display: inline-block; */
    white-space: nowrap;
    text-align: center;
    z-index: 200;
    /* color: #E74C3C !important; */

}
h1 {
    /* font-family: adonis-web,serif; */
    font-size: 5vw;
    line-height: 7vw;
    /* text-shadow: 2px 2px 2px black; */
    max-width: 1300px;
    color: white;
    position: relative;
    font-family: tablet-gothic-narrow,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-family: "balboa",sans-serif;
    /* text-transform: uppercase; */
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    color: black;
    padding-top: 10px;
}
h2 {
    color: #3c3c3c;
    color: white;
    font-family: "nimbus-sans",sans-serif;
    font-weight: 400;
    padding-right: 7%;
    font-size: 26px;
    line-height: 28px;
    padding-bottom: 10px;
    /* text-shadow: 1px 1px 1px #000000; */
}
.deathInThe {
    font-size: 5vw;
    line-height: 5vw;
    position: absolute;
    top: -5px;
    left: 15%;
}
h3 {
    color: white;
    /* text-shadow: 2px 2px 2px black; */
    width: 30%;
    position: relative;
    left: 38%;
    color: black;
    font-weight: 300;
    font-size: 18px;
    line-height: 20px;
}
h4 {
/*    text-transform: uppercase; */
    color:#E74C3C;
    color: white;
    font-family: "nimbus-sans",sans-serif;
    padding-left: 2px;
   /*  text-shadow: 1px 1px 1px #000000; */
    line-height: 100%;
}
h4 a, h4 a:visited {
    color: white !important;
}
.project {
    font-family: "balboa",sans-serif;
}

@media (min-width: 1600px) {
    .deathInThe {
        left: 18%;
    }
}
@media (max-width: 1145px) {
    h3 {
        left: 45%;
    }
}
@media (max-width: 1050px) {
    h3 {
        left: 20px;
        top: 10%;
        color: white;
        width: 50%;
        text-shadow: 2px 2px 1px black;
    }
}
@media (max-width: 800px) {
    h4 {
        font-size: 80%;
    }
    h3 {
        width: 80%;
        font-size: 16px;
        line-height: 18px;
    }
}
@media (max-width: 650px) {
    .hedBox {
        float: none;
        width: 100%;
        height: 50%;
        padding-top: 14%;
        padding-bottom: 14%;
        border-bottom: 1px solid white;
    }
    .projectHed {
        font-size: 22vw;
        line-height: 22vw;
    }

    .floatedHed {
        position: relative;

        top: 0;
        left: 0;
        max-width: initial;
    }
    .floatedHed h1, h2, h4 {
        color: black;
    }
    h4 a, h4 a:visited {
        color: black !important;
    }
    h1 {
        font-size: 10vw;
        line-height: 10vw;
    }
    h2 {
        font-size: 20px;
        line-height: 22px;
    }
    .hideOnMobile {
        display: none;
    }
    .hideOnDesktop {
        display: block;
    }
    .hed {
        height: 100vh;
    }
}
</style>