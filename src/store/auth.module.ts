import { Commit, Dispatch, Module } from "vuex"
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
            await RegisterApi.register(form)
            commit('registerSuccess')
        },
        async login({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, form: Login): Promise<void> {
            const auth = await AuthApi.login(form)
            commit('loginSuccess', auth)
            dispatch('user/getUser', null, {root: true})
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
