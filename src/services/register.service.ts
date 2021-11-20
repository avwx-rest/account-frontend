import axios from './api'
import { Register } from '@/models/auth'
import { User } from '@/models/user'

class RegisterApi {
    public async register(form: Register): Promise<User> {
        const data = await axios.post<User>('register', form)
        return data.data
    }

    public async verifyEmail(token: string): Promise<void> {
        const url = 'mail/verify/'+token
        await axios.post<void>(url)
    }

    public async forgotPassword(email: string): Promise<void> {
        const url = 'register/forgot-password'
        await axios.post<void>(url, { email }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
    }

    public async resetPassword(token: string, password: string): Promise<User> {
        const url = 'register/reset-password/'+token
        const data = await axios.post<User>(url, { password })
        return data.data
    }
}

const api = new RegisterApi()
export default api