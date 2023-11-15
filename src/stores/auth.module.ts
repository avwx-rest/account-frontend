import { defineStore } from "pinia"
import { Login, Register } from "@/models/auth"
import AuthApi from "@/services/auth.service"
import RegisterApi from "@/services/register.service"
import { useUserStore } from "./user.module"

export interface AuthState {
    loggedIn: boolean
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        loggedIn: AuthApi.accessToken != null
    }),
    actions: {
        async register(form: Register): Promise<void> {
            await RegisterApi.register(form)
            await RegisterApi.requestVerify(form.email)
            this.loggedIn = false
        },
        async login(form: Login): Promise<void> {
            const auth = await AuthApi.login(form)
            this.loggedIn = true
            AuthApi.saveAccessToken(auth.access_token)
            AuthApi.saveRefreshToken(auth.refresh_token)
            const userStore = useUserStore()
            userStore.getUser()
        },
        logout(): void {
            AuthApi.clearTokens()
            this.loggedIn = false
        }
    },
})
