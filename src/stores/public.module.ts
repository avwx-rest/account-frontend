import { defineStore } from 'pinia'
import { PLANS } from '@/data/plans'
import PlanApi from '@/services/plan.service'
import { Plan, PlanMap } from "@/models/plan"
import { Addon } from '@/models/addon'

interface PublicState {
    plans: PlanMap
    addons: Addon[]
}

function makeInitialState(): PublicState {
    return {
        plans: {},
        addons: [],
    }
}

// Load and combine local and remote plan data
function expandPlans(plans: Plan[]): PlanMap {
    const out: PlanMap = {}
    const yearly: { [key: string]: number } = {}
    for (const plan of plans) {
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
    for (const i in out) {
        out[i].yearly = yearly[out[i].key]
    }
    return out
}

export const usePublicStore = defineStore("publicdata", {
    state: makeInitialState,
    actions: {
        async getPlans(): Promise<void> {
            const plans = await PlanApi.getPlans()
            this.plans = expandPlans(plans)
        },
        async getAddons(): Promise<void> {
            const addons = await PlanApi.getAddons()
            this.addons = addons
        }
    }
})
