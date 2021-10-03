import axios from 'axios'
import { User } from '@/models/user'
import AccountApi from './account-api'

class UserApi extends AccountApi {
    public async getUser(): Promise<User> {
        const data = await axios.get<User>(this.root+'user', { headers: this.authHeaders })
        console.log("Got user")
        console.log(data)
        if (data.data.email) {
            localStorage.setItem('user', JSON.stringify(data.data))
        }
        return data.data
    }    
}

const api = new UserApi()
export default api