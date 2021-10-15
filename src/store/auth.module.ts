import { Commit, Module } from "vuex"
import { Login, RefreshToken } from "@/models/auth"
import AuthApi from "@/services/auth.service"
import RegisterApi from "@/services/register.service"

export interface AuthState {
    loggedIn: boolean
}

export const auth: Module<AuthState, any> = {
    namespaced: true,
    state: {
        loggedIn: AuthApi.accessToken != null
    },
    actions: {
        async register({ commit }: { commit: Commit }, form: Login): Promise<void> {
            console.log("Calling register")
            console.log(form)
            RegisterApi.register(form).then(
                () => commit('registerSuccess'),
                (error) => console.log(error),
            )
        },
        async login({ commit }: { commit: Commit }, form: Login): Promise<void> {
            console.log("Calling login")
            console.log(form)
            AuthApi.login(form).then(
                (auth) => commit('loginSuccess', auth),
                (error) => {
                    console.log(error)
                    // notification?
                }
            )
        },
        logout({ commit }: { commit: Commit }): void {
            commit('logout')
        },
    },

    mutations: {
        registerSuccess(state: AuthState): void {
            state.loggedIn = false
        },
        loginSuccess(state: AuthState, auth: RefreshToken): void {
            state.loggedIn = true
            AuthApi.saveAccessToken(auth.access_token)
            AuthApi.saveRefreshToken(auth.refresh_token)
        },
        // loginFailure(state: State): void {
        //     state.status.loggedIn = false
        // },
        logout(state: AuthState): void {
            AuthApi.clearTokens()
            state.loggedIn = false
        },
    }
}
