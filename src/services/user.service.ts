import axios from 'axios'
import { UserNotification, User } from '@/models/user'
import AccountApi from './account-api'

class UserApi extends AccountApi {
    public async getUser(): Promise<User> {
        const data = await axios.get<User>(this.root+'user', { headers: this.authHeaders })
        console.log("Got user")
        console.log(data)
        return data.data
    }

    public async getNotifications(): Promise<UserNotification[]> {
        const data = await axios.get<UserNotification[]>(this.root+'notification', { headers: this.authHeaders })
        console.log('Got notifications')
        console.log(data)
        return data.data
    }

    public async deleteNotification(notification: UserNotification): Promise<void> {
        const url = this.root+'notification/' + notification.id
        console.log(url)
        const data = await axios.delete<void>(url, { headers: this.authHeaders })
        console.log('Got notifications')
        console.log(data)
    }
}

const api = new UserApi()
export default api