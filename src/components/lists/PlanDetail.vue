<template>
    <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm" :class="[styleName]">
            <div class="card-header py-3">
                <h4 class="my-0 fw-normal">{{ plan.name }}</h4>
            </div>
            <div class="card-body">
                <div v-if="plan.yearly != undefined" class="row card-title pricing-card-title">
                    <div class="w-50">
                        <small>Monthly</small>
                        <h1>{{ monthlyPrice }}</h1>
                    </div>
                    <div class="w-50">
                        <small>Yearly</small>
                        <h1>{{ yearlyPrice }}</h1>
                    </div>
                </div>
                <h1 v-else class="card-title pricing-card-title">{{ monthlyPrice }}<small v-show="plan.price > 0" class="text-muted fw-light">/mo</small></h1>
                <ul class="list-unstyled mt-3 mb-4">
                    <li v-show="plan.preface"><b>{{ plan.preface }}</b></li>
                    <li v-for="link in plan.links" :key="link.text">
                        <a v-if="link.link" :href="link.link">{{ link.text }}</a>
                        <div v-else>{{ link.text }}</div>
                    </li>
                    <li><b>{{ callCount }}</b> calls per day</li>
                </ul>
                <div v-if="loggedIn">
                    <button v-if="userPlan && userPlan.key == plan.key" class="w-100 btn btn-lg btn-outline-secondary" disabled>Current Plan</button>
                    <button v-else-if="plan.key == 'free'" class="w-100 btn btn-lg btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#cancelPlanModal">Switch to Free</button>
                    <button v-else @click="switchPlan()" class="w-100 btn btn-lg btn-primary">Start Monthly</button>
                    <button v-if="userPlan && userPlan.key == plan.key+'-year'" class="w-100 btn btn-lg btn-outline-secondary" disbaled>Current Plan</button>
                    <button v-else-if="plan.key != 'free'" @click="switchPlan('-year')" class="w-100 btn btn-lg btn-primary">Start Yearly</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { Plan, PlanData } from '@/models/plan'
import { useAuthStore } from '@/stores/auth.module'
import { useUserStore } from '@/stores/user.module'

@Component({
    emits: ['switchPlan'],
})
class PlanDetail extends Vue {
    @Prop
    plan!: PlanData

    authStore = useAuthStore()
    userStore = useUserStore()

    get loggedIn(): boolean {
        return this.authStore.loggedIn
    }

    get userPlan(): Plan {
        return this.userStore.plan!
    }

    get styleName(): string {
        return "plan-" + this.plan.key
    }

    get monthlyPrice(): string {
        if (!this.plan.price || this.plan.price == 0) return 'Free'
        return `$${this.plan.price}`
    }

    get yearlyPrice(): string {
        if (this.plan.yearly) return `$${this.plan.yearly}`
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
        this.$emit('switchPlan', key)
    }
}

export default toNative(PlanDetail)
</script>

<style lang="scss">
button {
    margin-top: .25em;
}

.plan-free {
    .card-header {
        background-color: white;
        color: black;
    }
}

.plan-pro {
    border-color: rgba(#4d5155, 0.35);

    .card-header {
        background-color: #4d5155;
        color: white;
    }
}

.plan-enterprise {
    border-color: rgba(#4f68ae, 0.35);

    .card-header {
        background-color: #4f68ae;
        color: white;
    }
}
</style>