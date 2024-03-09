<template>
    <div>
        <CancelPlanModal @cancel="cancelPlan()" @change="switchPlan('free')" />
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div v-for="key in keys" :key="key">
                <PlanDetail v-if="plans[key]" :plan="plans[key]" @switchPlan="switchPlan" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { useToast } from 'vue-toast-notification'
import PlanDetail from '@/components/lists/PlanDetail.vue'
import CancelPlanModal from '@/components/CancelPlanModal.vue'
import { PlanMap } from '@/models/plan'
import PlanApi from '@/services/plan.service'
import { usePublicStore } from '@/stores/public.module'
import { useUserStore } from '@/stores/user.module'

@Component({
    components: {
        CancelPlanModal,
        PlanDetail,
    },
})
class PlanList extends Vue {
    keys = ['free', 'pro', 'enterprise']

    toast = useToast()
    publicStore = usePublicStore()
    userStore = useUserStore()

    get plans(): PlanMap {
        return this.publicStore.plans
    }
    
    public mounted(): void {
        this.publicStore.getPlans()
    }

    public reloadUser(): void {
        this.userStore.getUser()
    }

    public switchPlan(key: string): void {
        let newWindow: Window | null
        if (!this.userStore.user?.stripe?.subscription_id) newWindow = window.open()
        PlanApi.changePlan(key).then(
            (url) => {
                if (url && newWindow) {
                    newWindow.location.href = url
                } else {
                    this.toast.success('Successfully updated your plan')
                    this.reloadUser()
                }
            },
            (error) => {
                console.log(error)
                this.toast.error('There was an error updating your plan')
            },
        )
    }

    public hideCancelModal(): void {
        const modal = document.getElementById('cancelPlanModal')
        if (modal) modal.remove()
        for (const item of document.getElementsByClassName('modal-backdrop')) item.remove()
    }

    public cancelPlan(): void {
        PlanApi.cancelPlan().then(
            () => {
                this.toast.success('Your plan has been cancelled')
                this.hideCancelModal()
                this.reloadUser()
            },
            (error) => {
                console.log(error)
                this.toast.error('There was an error cancelling your plan')
            },
        )
    }
}

export default toNative(PlanList)
</script>