import { Commit } from "vuex"
import { User } from "@/models/user"
import { Login, RefreshToken } from "@/models/auth"
import AuthApi from "@/services/auth.service"
import RegisterApi from "@/services/register.service"

export interface Status {
    loggedIn: boolean
}

export interface State {
    status: Status
    auth?: RefreshToken
    user?: User
}

function makeInitialState(): State {
    let auth, user
    const authString = localStorage.getItem("auth")
    const userString = localStorage.getItem("user")
    console.log(authString)
    console.log(userString)
    if (authString) auth = JSON.parse(authString)
    if (userString) user = JSON.parse(userString)
    
    return {
        status: { loggedIn: auth !== undefined },
        auth: auth,
        user: user,
    }
}

export const auth = {
    namespaced: true,
    state: makeInitialState(),
    actions: {
        async register({ commit }: { commit: Commit }, form: Login): Promise<void> {
            console.log("Calling register")
            console.log(form)
            const auth = await RegisterApi.register(form)
            console.log("Got register")
            console.log(auth)
            commit('registerSuccess', auth)

            // else  commit('registerFailure')
        },
        async login({ commit }: { commit: Commit }, form: Login): Promise<void> {
            console.log("Calling login")
            console.log(form)
            const auth = await AuthApi.login(form)
            console.log("Got login")
            console.log(auth)
            commit('loginSuccess', auth)

            // else  commit('loginFailure')
        },
        logout({ commit }: { commit: Commit }): void {
            AuthApi.logout()
            commit('logout')
        },
    },

    mutations: {
        registerSuccess(state: State, user: User): void {
            console.log("In success")
            console.log(user)
            state.status.loggedIn = false
            state.user = user
        },
        loginSuccess(state: State, auth: RefreshToken): void {
            console.log("In success")
            console.log(auth)
            state.status.loggedIn = true
            state.auth = auth
        },
        // loginFailure(state: State): void {
        //     state.status.loggedIn = false
        //     state.user = undefined
        // },
        logout(state: State): void {
            state.status.loggedIn = false
            state.user = undefined
        },
    }
}
