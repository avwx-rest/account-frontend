import axios from './api'
import { Plan } from '@/models/plan'

interface StripeCheckout {
    url: string
}

class PlanApi {
    public async getPlans(): Promise<Plan[]> {
        const data = await axios.get<Plan[]>('plan/all')
        return data.data
    }

    public async changePlan(key: string): Promise<string | null> {
        const data = await axios.post<StripeCheckout>('plan', { key })
        return data.data?.url
    }
}

const api = new PlanApi()
export default api