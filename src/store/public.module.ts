import { Commit } from 'vuex'
import { PLANS } from '@/data/plans'
import PlanApi from '@/services/plan.service'
import { Plan, PlanMap } from "@/models/plan"

interface PublicState {
    plans: PlanMap
}

function makeInitialState(): PublicState {
    return {
        plans: {}
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

export const publicdata = {
    namespaced: true,
    state: makeInitialState(),
    actions: {
        async getPlans({ commit }: { commit: Commit }): Promise<void> {
            console.log('Calling get plans')
            const plans = await PlanApi.getPlans()
            console.log('Got plans')
            console.log(plans)
            commit('getPlansSuccess', expandPlans(plans))
        },
    },
    mutations: {
        getPlansSuccess(state: PublicState, plans: PlanMap): void {
            console.log('In success')
            console.log(plans)
            state.plans = plans
        }
    }
}