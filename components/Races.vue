<template>
    <div>
        <div v-for="race in data.races">
            <race :data="race" />
        </div>
    </div>
</template>

<script>
import Race from '~/components/Race.vue';

export default {
    components: {
        Race
    },
    props: ['data'],
    name: 'Races'
};
</script>

<style scoped>

</style>