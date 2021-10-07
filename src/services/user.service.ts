import axios from 'axios'
import { Notification, User } from '@/models/user'
import AccountApi from './account-api'

class UserApi extends AccountApi {
    public async getUser(): Promise<User> {
        const data = await axios.get<User>(this.root+'user', { headers: this.authHeaders })
        console.log("Got user")
        console.log(data)
        if (data.data.email) {
            localStorage.setItem('user', JSON.stringify(data.data))
        }
        return data.data
    }

    public async getNotifications(): Promise<Notification[]> {
        const data = await axios.get<Notification[]>(this.root+'notification', { headers: this.authHeaders })
        console.log('Got notifications')
        console.log(data)
        return data.data
    }

    public async deleteNotification(notification: Notification): Promise<void> {
        const url = this.root+'notification/' + notification.id
        console.log(url)
        const data = await axios.delete<void>(url, { headers: this.authHeaders })
        console.log('Got notifications')
        console.log(data)
    }
}

const api = new UserApi()
export default api