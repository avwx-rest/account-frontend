<template>
    <div>
        <CancelPlanModal @close="showCancelModal = false" @cancel="cancelPlan()" @change="switchPlan('free')" />
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div v-for="key in keys" :key="key">
                <PlanDetail v-if="plans[key]" v-bind:plan="plans[key]" @switchPlan="switchPlan" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PlanDetail from '@/components/lists/PlanDetail.vue'
import CancelPlanModal from '@/components/CancelPlanModal.vue'
import { PlanMap } from '@/models/plan'
import PlanApi from '@/services/plan.service'

@Options({
    components: {
        CancelPlanModal,
        PlanDetail,
    },
})
export default class PlanList extends Vue {
    keys = ['free', 'pro', 'enterprise']

    get plans(): PlanMap {
        return this.$store.state.publicdata.plans
    }
    
    public mounted(): void {
        this.$store.dispatch('publicdata/getPlans')
    }

    public reloadUser(): void {
        this.$store.dispatch('user/getUser')
    }

    public switchPlan(key: string): void {
        let newWindow: Window | null
        if (!this.$store.state.user.user?.stripe?.subscription_id) newWindow = window.open()
        PlanApi.changePlan(key).then(
            (url) => {
                console.log(url)
                if (url && newWindow) {
                    newWindow.location.href = url
                } else {
                    this.reloadUser()
                }
            },
            (error) => console.log(error),
        )
    }

    public cancelPlan(): void {
        PlanApi.cancelPlan().then(
            () => this.reloadUser(),
            (error) => console.log(error),
        )
    }
}
</script>