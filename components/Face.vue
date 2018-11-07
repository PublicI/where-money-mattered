<template>
    <div :style="'opacity:' + opacity" class="photoCircle">
        <div :style="'background-color:' + color" class="background"></div>

        <img :src="'img/portraits/cobbed/' + photo.replace(/ /g,'_').replace('.jpg','.png')" class="photo" :style="(opacity == '1' ? '' : 'filter:grayscale(50%) saturate(20%);')" />

        <img src="img/circle-grayer.png" class="circle" />
    </div>
</template>

<script>
export default {
    props: ['photo','color','opacity'],
    name: 'Face'
};
</script>

<style scoped>
.background {
    width:100%;
    height:100%;
    /* border: 3px solid white; */
    position:absolute;
    top:0;
    left:0;
}
.photoCircle {
    width:115px;
    height:115px;
    overflow:hidden;
    position: relative;
    float: left;
}
.photo {
    height:110px;
    width: auto;
    opacity:1;
    position: absolute;
    bottom:0;
    left:15px;
}
.circle {
    width:100%;
    height: auto;
    position: absolute;
    top:0;
    left:0;
}
</style>