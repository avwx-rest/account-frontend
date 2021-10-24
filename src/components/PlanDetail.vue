<template>
    <CancelPlanModal v-if="showCancelModal" @close="showCancelModal = false" @cancel="cancelPlan()" @change="switchPlan()" />
    <h3>{{ plan.name }}</h3>
    <h5>{{ monthlyPrice }}</h5>
    <h6 v-if="plan.yearly !== undefined">Or {{ yearlyPrice }}</h6>
    <ul>
        <li v-show="plan.preface"><b>{{ plan.preface }}</b></li>
        <li v-for="link in plan.links" :key="link">
            <a v-if="link.link" href="link.link">{{ link.text }}</a>
            <div v-else>{{ link.text }}</div>
        </li>
        <li><b>{{ callCount }}</b> calls per day</li>
    </ul>
    <div v-if="loggedIn">
        <div v-if="userPlan && userPlan.key == plan.key">Current Plan</div>
        <button v-else-if="plan.key == 'free'" @click="showCancelModal = true" class="btn btn-primary">Switch to Free</button>
        <button v-else @click="switchPlan()" class="btn btn-primary">Start Monthly</button>
        <div v-if="userPlan && userPlan.key == plan.key+'-year'">Current Plan</div>
        <button v-else-if="plan.key != 'free'" @click="switchPlan('-year')" class="btn btn-primary">Start Yearly</button>
    </div>
    
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Plan, PlanData } from '@/models/plan'
import PlanApi from '@/services/plan.service'
import CancelPlanModal from '@/components/forms/CancelPlanModal.vue'

@Options({
    components: {
        CancelPlanModal,
    },
    props: {
        plan: { type: Object as PropType<PlanData> }
    },
    emits: ['reloadUser'],
})
export default class PlanDetail extends Vue {
    plan!: PlanData
    showCancelModal = false

    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }

    get userPlan(): Plan {
        return this.$store.state.user.plan
    }

    get monthlyPrice(): string {
        if (!this.plan.price || this.plan.price == 0) return 'Free'
        return `$${this.plan.price} / month`
    }

    get yearlyPrice(): string {
        if (this.plan.yearly) return `$${this.plan.yearly} / year`
        return ''
    }

    get callCount(): string {
        let value: number
        let postfix: string
        if (this.plan.limit >= 1000000) {
            value = this.plan.limit / 1000000
            postfix = "M"
        } else {
            value = this.plan.limit / 1000
            postfix = "k"
        }
        return value.toFixed(1).replace('.0', '') + postfix
    }

    public switchPlan(postfix?: string): void {
        let key = this.plan.key
        if (postfix) key += postfix
        let newWindow: Window | null
        if (!this.$store.state.user.user?.stripe?.subscription_id) newWindow = window.open()
        PlanApi.changePlan(key).then(
            (url) => {
                if (url && newWindow) {
                    newWindow.location.href = url
                } else {
                    this.showCancelModal = false
                    this.$emit('reloadUser')
                }
            },
            (error) => console.log(error),
        )
    }

    public cancelPlan(): void {
        PlanApi.cancelPlan().then(
            () => {
                this.showCancelModal = false
                this.$emit('reloadUser')
            },
            (error) => console.log(error),
        )
    }
}
</script>