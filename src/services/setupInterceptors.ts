import { useAuthStore } from '@/stores/auth.module'
import axiosInstance from './api'
import AuthApi from './auth.service'

function urlShouldRefresh(endpoint: string): boolean {
    if (typeof endpoint != 'string') return false
    const url = endpoint as string
    if (url == 'auth/login' || url == 'auth/refresh') return false
    if (url.startsWith('mail/verify')) return false
    if (url.startsWith('register/reset-password')) return false
    return true
}

export default function setup(): void {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = config.url == 'auth/refresh' ? AuthApi.refreshToken : AuthApi.accessToken
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token
                config.headers['Access-Control-Allow-Origin'] = '*'
            }
            return config
        },
        (error) => Promise.reject(error),
    )

    axiosInstance.interceptors.response.use(
        (res) => res,
        async (err) => {
            const originalConfig = err.config

            if (urlShouldRefresh(originalConfig.url) && err.response) {
                // Access Token was expired
                if ((err.response.status === 401 || err.response.status === 422) && !originalConfig._retry) {
                    originalConfig._retry = true

                    try {
                        const newAuth = await AuthApi.refresh()

                        AuthApi.saveAccessToken(newAuth.access_token)

                        return axiosInstance(originalConfig)
                    } catch (_error) {
                        useAuthStore().logout()
                        Promise.reject(_error)
                    }
                }
            }

            return Promise.reject(err)
        }
    )
}