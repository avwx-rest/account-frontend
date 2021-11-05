import axios from './api'
import { Token, TokenUpdate, TokenUsage } from '@/models/token'

class TokenApi {
    public async getTokens(): Promise<Token[]> {
        const data = await axios.get<Token[]>('token')
        return data.data
    }

    public async newToken(): Promise<Token> {
        const data = await axios.post<Token>('token', null)
        return data.data
    }

    public async refreshToken(token: Token): Promise<Token> {
        const url = `token/${token._id}/refresh`
        const data = await axios.post<Token>(url, null)
        return data.data
    }

    public async updateToken(token: Token, form: TokenUpdate): Promise<Token> {
        const url = 'token/' + token._id
        const data = await axios.patch<Token>(url, form)
        return data.data
    }

    public async deleteToken(token: Token): Promise<void> {
        const url = 'token/' + token._id
        await axios.delete<Token>(url)
    }

    public async allHistory(days = 30): Promise<TokenUsage[]> {
        const data = await axios.get<TokenUsage[]>('token/history', {
            params: { days },
        })
        return data.data
    }
}

const api = new TokenApi()
export default api