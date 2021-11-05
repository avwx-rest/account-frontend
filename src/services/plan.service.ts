import axios from './api'
import { Plan } from '@/models/plan'
import { Addon } from '@/models/addon'

interface StripeCheckout {
    url: string
}

class PlanApi {
    public async getPlans(): Promise<Plan[]> {
        const data = await axios.get<Plan[]>('plan/all')
        return data.data
    }

    public async changePlan(key: string): Promise<string | null> {
        const data = await axios.post<StripeCheckout>('plan', {
            key,
            remove_addons: false,
        })
        return data.data?.url
    }

    public async cancelPlan(): Promise<void> {
        await axios.post<void>('plan', {
            key: 'free',
            remove_addons: true,
        })
    }

    public async getAddons(): Promise<Addon[]> {
        const data = await axios.get<Addon[]>('addon/all')
        return data.data
    }

    public async addAddon(key: string): Promise<string | null> {
        const data = await axios.post<StripeCheckout>('addon/' + key, null)
        return data.data?.url
    }

    public async removeAddon(key: string): Promise<void> {
        await axios.delete<void>('addon/' + key)
    }
}

const api = new PlanApi()
export default api