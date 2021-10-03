import axios from 'axios'
import { Token, TokenUpdate } from '@/models/token'
import AccountApi from './account-api'

class TokenApi extends AccountApi {
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

    public async refreshToken(token: Token): Promise<Token> {
        const url = `${this.root}token/${token.value}/refresh`
        const data = await axios.post<Token>(url, null, { headers: this.authHeaders })
        console.log("Refreshed token")
        console.log(data)
        return data.data
    }

    public async updateToken(token: Token, form: TokenUpdate): Promise<Token> {
        const url = `${this.root}token/${token.value}`
        const data = await axios.patch<Token>(url, form, { headers: this.authHeaders })
        console.log("Updated token")
        console.log(data)
        return data.data
    }

    public async deleteToken(token: Token): Promise<void> {
        const url = `${this.root}token/${token.value}`
        const data = await axios.delete<Token>(url, { headers: this.authHeaders })
        console.log("Deleted token")
        console.log(data)
    }
}

const api = new TokenApi()
export default api