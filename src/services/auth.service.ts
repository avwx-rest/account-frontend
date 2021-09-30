import axios from 'axios'
import { RefreshToken } from '@/models/auth'
import { User } from '@/models/user'

class AuthApi {
    root = 'https://avwx-account-dev.azurewebsites.net/'

    get authHeaders(): { [key: string]: string } {
        const authString = localStorage.getItem('auth')
        if (!authString) return {}
        const auth: RefreshToken = JSON.parse(authString)
        return { Authorization: 'Bearer ' + auth.access_token }
    }

    public async getUser(): Promise<User> {
        const data = await axios.get<User>(this.root+'user', { headers: this.authHeaders })
        console.log("Got data")
        console.log(data)
        if (data.data.email) {
            localStorage.setItem('user', JSON.stringify(data.data))
        }
        return data.data
    }
}

const api = new AuthApi()
export default api