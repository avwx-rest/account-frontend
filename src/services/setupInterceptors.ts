import axiosInstance from './api'
import AuthApi from './auth.service'

export default function setup(): void {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = config.url == 'auth/refresh' ? AuthApi.refreshToken : AuthApi.accessToken
            if (token) {
                if (!config.headers) config.headers = {}
                config.headers['Authorization'] = 'Bearer ' + token
                // config.headers['Access-Control-Allow-Origin'] = '*'
            }
            return config
        },
        (error) => Promise.reject(error),
    )

    axiosInstance.interceptors.response.use(
        (res) => res,
        async (err) => {
            const originalConfig = err.config

            if ((originalConfig.url !== 'auth/login' && originalConfig.url !== 'auth/refresh') && err.response) {
                // Access Token was expired
                if ((err.response.status === 401 || err.response.status === 422) && !originalConfig._retry) {
                    originalConfig._retry = true

                    try {
                        const newAuth = await AuthApi.refresh()

                        AuthApi.saveAccessToken(newAuth.access_token)

                        return axiosInstance(originalConfig)
                    } catch (_error) {
                        Promise.reject(_error)
                    }
                }
            }

            return Promise.reject(err)
        }
    )
}