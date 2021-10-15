import axios from './api'
import { AccessToken, Login, RefreshToken } from '@/models/auth'

const ACCESS_TOKEN_KEY = 'auth-access'
const REFRESH_TOKEN_KEY = 'auth-refresh'

class AuthApi {
    public async login(form: Login): Promise<RefreshToken> {
        const data = await axios.post<RefreshToken>('auth/login', form)
        return data.data
    }

    public async refresh(): Promise<AccessToken> {
        const data = await axios.post<AccessToken>('auth/refresh', null, {
            headers: { Authorization: 'Bearer ' + this.refreshToken }
        })
        return data.data
    }

    get accessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    }

    get refreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    }

    public saveAccessToken(value: string): void {
        localStorage.setItem(ACCESS_TOKEN_KEY, value)
    }

    public saveRefreshToken(value: string): void {
        localStorage.setItem(REFRESH_TOKEN_KEY, value)
    }

    public clearTokens(): void {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
}

const api = new AuthApi()
export default api