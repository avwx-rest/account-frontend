import axios from './api'
import { Login } from '@/models/auth'
import { User } from '@/models/user'

class RegisterApi {
    public async register(form: Login): Promise<User> {
        const data = await axios.post<User>('register', form)
        return data.data
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