<template>
    <h1>AVWX Plans</h1>
    <PlanList />
    <h2>Plan Addons</h2>
    <AddonList />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AddonList from '@/components/AddonList.vue'
import PlanList from '@/components/PlanList.vue'

@Options({
    components: {
        AddonList,
        PlanList,
    },
})
export default class Plans extends Vue {}
</script>