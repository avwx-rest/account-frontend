import axios from 'axios'
import { RefreshToken } from '@/models/auth'
import { User } from '@/models/user'
import { Token } from '@/models/token'

class AuthApi {
    root = 'https://avwx-account-dev.azurewebsites.net/'

    get authHeaders(): { [key: string]: string } {
        const authString = localStorage.getItem('auth')
        if (!authString) return {}
        const auth: RefreshToken = JSON.parse(authString)
        console.log(auth.access_token)
        return { Authorization: 'Bearer ' + auth.access_token }
    }

    public async getUser(): Promise<User> {
        const data = await axios.get<User>(this.root+'user', { headers: this.authHeaders })
        console.log("Got user")
        console.log(data)
        if (data.data.email) {
            localStorage.setItem('user', JSON.stringify(data.data))
        }
        return data.data
    }

    public async getTokens(): Promise<Token[]> {
        const data = await axios.get<Token[]>(this.root+'token', { headers: this.authHeaders })
        console.log("Got tokens")
        console.log(data)
        return data.data
    }

    public async newToken(): Promise<Token> {
        const data = await axios.post<Token>(this.root+'token', null, { headers: this.authHeaders })
        console.log("Got new token")
        console.log(data)
        return data.data
    }
}

const api = new AuthApi()
export default api