import { Commit } from "vuex"
import { Login, RefreshToken } from "@/models/auth"
import AuthApi from "@/services/auth.service"
import RegisterApi from "@/services/register.service"

export interface AuthState {
    loggedIn: boolean
    auth?: RefreshToken
}

function makeInitialState(): AuthState {
    let auth
    const authString = localStorage.getItem("auth")
    console.log(authString)
    if (authString) auth = JSON.parse(authString) as RefreshToken
    return {
        loggedIn: auth !== undefined,
        auth: auth,
    }
}

export const auth = {
    namespaced: true,
    state: makeInitialState(),
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
            console.log("In success")
            state.loggedIn = false
        },
        loginSuccess(state: AuthState, auth: RefreshToken): void {
            console.log("In success")
            console.log(auth)
            localStorage.setItem('auth', JSON.stringify(auth))
            state.loggedIn = true
            state.auth = auth
        },
        // loginFailure(state: State): void {
        //     state.status.loggedIn = false
        // },
        logout(state: AuthState): void {
            localStorage.removeItem('auth')
            state.loggedIn = false
        },
    }
}
