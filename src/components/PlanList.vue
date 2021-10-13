<template>
    <PlanDetail v-if="plans['free']" v-bind:plan="plans['free']" />
    <PlanDetail v-if="plans['pro']" v-bind:plan="plans['pro']" />
    <PlanDetail v-if="plans['enterprise']" v-bind:plan="plans['enterprise']" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PlanDetail from '@/components/PlanDetail.vue'
import { PlanMap } from '@/models/plan'

@Options({
    components: {
        PlanDetail,
    },
})
export default class PlanList extends Vue {
    get plans(): PlanMap {
        return this.$store.state.publicdata.plans
    }
    
    public mounted(): void {
        this.$store.dispatch('publicdata/getPlans')
    }
}
</script>