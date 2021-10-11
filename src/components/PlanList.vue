<template>
    <PlanDetail v-if="plans['free']" v-bind:plan="plans['free']" />
    <PlanDetail v-if="plans['pro']" v-bind:plan="plans['pro']" />
    <PlanDetail v-if="plans['enterprise']" v-bind:plan="plans['enterprise']" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PlanDetail from '@/components/PlanDetail.vue'
import { PLANS } from '@/data/plans'
import { Plan, PlanData } from '@/models/plan'
import PlanApi from '@/services/plan.service'

@Options({
    components: {
        PlanDetail,
    },
})
export default class PlanList extends Vue {
    plans: { [key: string]: PlanData } = {}
    
    public mounted(): void {
        PlanApi.getPlans().then(
            (plans) => this.expandPlans(plans),
            (error) => console.log(error),
        )
    }

    // Load and combine local and remote plan data
    private expandPlans(plans: Plan[]): void {
        console.log(plans)
        let out: { [key: string]: PlanData } = {}
        let yearly: { [key: string]: number } = {}
        for (let plan of plans) {
            if (plan.key.endsWith('-year')) {
                yearly[plan.key.replace('-year', '')] = plan.price
            }
            const displayFields = PLANS[plan.key]
            if (displayFields) {
                out[plan.key] = {
                    ...plan,
                    ...displayFields,
                }
            }
        }
        for (let i in out) {
            out[i].yearly = yearly[out[i].key]
        }
        this.plans = out
    }
}
</script>