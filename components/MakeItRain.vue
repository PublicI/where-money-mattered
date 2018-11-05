<template>
    <div class="billsContainer">
        <no-ssr>
            <div v-if="inViewport.now">
                <span v-for="bill in bills" class="billsBillsBills" :style="'left:' + bill.randomPosition + '%;top:-150px;-webkit-animation-delay:' + bill.randomTime + 's;-webkit-animation-duration:' + bill.randomSpeed + 's'"><img :src="'img/' + (burning ? 'burning-money.gif' : 'static-money.png')" width="70" height="91" alt="a dollar bill"></span>
            </div>
        </no-ssr>
    </div>
</template>

<script>
import inViewport from 'vue-in-viewport-mixin';

export default {
    props: ['data','burning'],
    name: 'Byline',
    mixins: [ inViewport ],
    computed: {
        bills() {
            // https://github.com/sarahlesh/makeItRain/blob/master/makeItRain.js

            let bills = [];
            let maxBills = 20;

            for (let i = 0; i < maxBills; i++) {

                let width = 100; // $(window).width();

                let randomPosition = Math.floor(width*Math.random());

                let randomTime = Math.random() * 20;
                let randomSpeed = (Math.random()*20)+10;

                bills.push({
                    randomPosition,
                    randomTime,
                    randomSpeed
                });

            }

            return bills;
        }
    }
};
</script>

<style>
.billsContainer {
    position:absolute;
    top:0;
    left:0;
    z-index:100;
    width:100%;
    height:100%;
    pointer-events: none;
    overflow: hidden;
}
/* https://github.com/sarahlesh/makeItRain/blob/master/makeItRain.css */
@-webkit-keyframes sway {
    0%{
        top:-91px;
        -webkit-transform: rotateX(-20deg);
        transform: rotateX(-20deg);
    }

    3%{
         margin-left: -2%;
             -webkit-transform: rotateX(-80deg);
          transform: rotateX(-80deg);
    }

    7% {
        margin-left:1%;
         -webkit-transform: rotateX(-170deg);
          transform: rotateX(-170deg);
    }
  10% {
    margin-left: 2%;
      -webkit-transform: rotateX(-230deg);
          transform: rotateX(-230deg);
     }
   16% {
        margin-left: 5%;
              -webkit-transform: rotateX(-250deg);
          transform: rotateX(-250deg);
   }
   22% {
     margin-left: 3%;
            -webkit-transform: rotateX(-280deg);
          transform: rotateX(-280deg);
   }

  28% {
    margin-left: 0%;
          -webkit-transform: rotateX(-300deg);
          transform: rotateX(-300deg);
     }

  35% {
    margin-left: 3.5%;
      -webkit-transform: rotateX(-310deg);
          transform: rotateX(-310deg);
  }

  48% {
    margin-left: 1%;
     -webkit-transform: rotateX(-350deg);
          transform: rotateX(-350deg);
     }

   58% {
    margin-left: 3.5%;
     -webkit-transform: rotateX(-310deg);
          transform: rotateX(-310deg);
   }

   70%{
        margin-left: 0.5%;
         -webkit-transform: rotateX(-280deg);
          transform: rotateX(-280deg);
   }

  83% {
    margin-left: -2%;
     -webkit-transform: rotateX(-230deg);
          transform: rotateX(-230deg);

}

  95% {
    margin-left: 2%;
  -webkit-transform: rotateX(-200deg);
          transform: rotateX(-200deg);
     }

  100% {
    margin-left: 3%;
    top: 100%; } 
}


span.billsBillsBills {
  padding: 5px;
  display: block;
  position: absolute;
  z-index: 100;
  -webkit-animation: sway 30s ease-out;
  animation: sway 30s ease-out;
}
</style>