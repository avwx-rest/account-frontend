import { Commit, Module } from 'vuex'
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

export const publicdata: Module<PublicState, any> = {
    namespaced: true,
    state: makeInitialState(),
    actions: {
        async getPlans({ commit }: { commit: Commit }): Promise<void> {
            const plans = await PlanApi.getPlans()
            commit('getPlansSuccess', expandPlans(plans))
        },

        async getAddons({ commit }: { commit: Commit }): Promise<void> {
            const addons = await PlanApi.getAddons()
            commit('getAddonsSuccess', addons)
        },
    },
    mutations: {
        getPlansSuccess(state: PublicState, plans: PlanMap): void {
            state.plans = plans
        },

        getAddonsSuccess(state: PublicState, addons: Addon[]): void {
            state.addons = addons
        }
    }
}