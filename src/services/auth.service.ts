import axios from 'axios'
import { Login, RefreshToken } from '@/models/auth'

import AccountApi from './account-api'

class AuthApi extends AccountApi {
    public async login(form: Login): Promise<RefreshToken> {
        const data = await axios.post<RefreshToken>(this.root+'auth/login', form)
        console.log("Got data")
        console.log(data)
        return data.data
    }
}

const api = new AuthApi()
export default api