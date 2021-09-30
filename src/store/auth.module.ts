import { Commit } from "vuex"
import { User } from "@/models/user"
import { Login, RefreshToken } from "@/models/auth"
import PublicApi from "@/services/public.service"

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
        async login({ commit }: { commit: Commit }, form: Login): Promise<void> {
            console.log("Calling login")
            console.log(form)
            const auth = await PublicApi.login(form)
            console.log("Got login")
            console.log(auth)
            commit('loginSuccess', auth)

            // else  commit('loginFailure')
        },
        logout({ commit }: { commit: Commit }): void {
            PublicApi.logout()
            commit('logout')
        },
    },

    mutations: {
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
