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
}

const api = new RegisterApi()
export default api