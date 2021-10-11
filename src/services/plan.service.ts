import axios from 'axios'
import { Plan } from '@/models/plan'
import AccountApi from './account-api'

interface StripeCheckout {
    url: string
}

class PlanApi extends AccountApi {
    public async getPlans(): Promise<Plan[]> {
        const data = await axios.get<Plan[]>(this.root+'plan/all')
        console.log("Got plans")
        console.log(data)
        return data.data
    }

    public async changePlan(key: string): Promise<string> {
        const data = await axios.post<StripeCheckout>(this.root+'plan', { key }, { headers: this.authHeaders })
        console.log("Got checkout")
        console.log(data)
        return data.data.url
    }
}

const api = new PlanApi()
export default api