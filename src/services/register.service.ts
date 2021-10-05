import axios from 'axios'
import { Login } from '@/models/auth'
import { User } from '@/models/user'
import AccountApi from './account-api'

class RegisterApi extends AccountApi {
    public async register(form: Login): Promise<User> {
        const data = await axios.post<User>(this.root+'register', form)
        console.log("Got data")
        console.log(data)
        return data.data
    }

    public async forgotPassword(email: string): Promise<void> {
        const url = this.root+'register/forgot-password'
        const response = await axios.post<void>(url, { email }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        console.log("Got response")
        console.log(response)
    }

    public async resetPassword(token: string, password: string): Promise<User> {
        const url = this.root+'register/reset-password/'+token
        const data = await axios.post<User>(url, { password })
        console.log("Got data")
        console.log(data)
        return data.data
    }
}

const api = new RegisterApi()
export default api