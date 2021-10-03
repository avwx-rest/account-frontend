import { RefreshToken } from '@/models/auth'

export default class AccountApi {
    root = 'https://avwx-account-dev.azurewebsites.net/'

    get authHeaders(): { [key: string]: string } {
        const authString = localStorage.getItem('auth')
        if (!authString) return {}
        const auth: RefreshToken = JSON.parse(authString)
        console.log(auth.access_token)
        return { Authorization: 'Bearer ' + auth.access_token }
    }
}