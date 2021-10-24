<template>
    <h1>AVWX Plans</h1>
    <PlanList />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PlanList from '@/components/PlanList.vue'

@Options({
    components: {
        PlanList,
    },
})
export default class Plans extends Vue {}
</script>