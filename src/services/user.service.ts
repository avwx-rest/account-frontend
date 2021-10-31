import axios from './api'
import { UserNotification, User } from '@/models/user'

interface StripePortal {
    url: string
}

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

    public async stripeSuccess(success: boolean): Promise<void> {
        const route = success ? 'success' : 'cancel'
        await axios.get<void>('stripe/' + route)
    }

    public async stripePortal(): Promise<string | null> {
        const data = await axios.get<StripePortal>('stripe/portal')
        return data.data?.url
    }
}

const api = new UserApi()
export default api