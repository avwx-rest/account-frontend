import axios from './api'
import { TokenUsage } from '@/models/token'
import { User } from '@/models/user'
import { WiggleHeader } from '@/models/wiggle'

class WiggleApi {
    public async userData(header: WiggleHeader): Promise<User> {
        const url = header.root+'/user/data'
        const data = await axios.post<User>(url, { email: header.email })
        return data.data
    }

    public async allHistory(header: WiggleHeader, days = 30): Promise<TokenUsage[]> {
        const url = header.root+'/token/history'
        const data = await axios.post<TokenUsage[]>(url, { email: header.email }, { params: { days } })
        return data.data
    }
}

const api = new WiggleApi()
export default api