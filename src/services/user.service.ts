import axios from './api'
import { UserNotification, User } from '@/models/user'

class UserApi {
    public async getUser(): Promise<User> {
        const data = await axios.get<User>('user')
        return data.data
    }

    public async getNotifications(): Promise<UserNotification[]> {
        const data = await axios.get<UserNotification[]>('notification')
        return data.data
    }

    public async deleteNotification(notification: UserNotification): Promise<void> {
        await axios.delete<void>('notification/' + notification.id)
    }
}

const api = new UserApi()
export default api