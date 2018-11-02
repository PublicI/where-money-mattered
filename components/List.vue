<template>
    <div :class="'list centralColumn ' + data.type">

        <h3 v-if="data.hed">{{data.hed}}</h3>

        <ul>
            <li v-for="item in data.list">{{item}}</li>
        </ul>

    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'List'
};
</script>

<style>
.list h3 {
    margin-bottom: 10px;
    margin-top: 30px;
}
.list h3 {
    font-family: "balboa",sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    color: black;
    text-shadow: none;
}
.list ul {
    padding-left: 25px;
}
.list li {
    /*
    font-family: "ff-tisa-web-pro","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-family: MaisonNeue, Arial, Helvetica, Verdana, sans-serif; */
    font-family: "nimbus-sans",sans-serif;
    /* font-family: "franklin-gothic-condensed",sans-serif; */
    font-weight: 400;
    font-size: 19px;
    line-height: 25px;
    color: rgb(50,50,50);
    padding-bottom: 15px;
}
a:visited {
    color: #E74C3C;
}
a {
    text-decoration: none;
    color: #E74C3C;
}
</style>