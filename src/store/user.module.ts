import { Commit } from "vuex"
import { User, UserNotification } from "@/models/user"
import TokenApi from '@/services/token.service'
import UserApi from '@/services/user.service'
import { Plan } from "@/models/plan"
import { Token } from "@/models/token"
import { Addon } from "@/models/addon"

interface UserState {
    user?: User
    plan?: Plan
    tokens: Token[]
    addons: Addon[]
    notifications: UserNotification[]
}

function makeInitialState(): UserState {
    const userString = localStorage.getItem("user")
    console.log(userString)
    if (!userString) {
        return {
            tokens: [],
            addons: [],
            notifications: [],
        }
    }
    const user = JSON.parse(userString) as User
    return {
        user: user,
        plan: user.plan,
        tokens: user.tokens,
        addons: user.addons,
        notifications: user.notifications,
    }
}

export const user = {
    namespaced: true,
    state: makeInitialState(),
    actions: {
        clear({ commit }: { commit: Commit }): void {
            commit('clearAll')
        },
        async getUser({ commit }: { commit: Commit }): Promise<void> {
            console.log('Calling get user')
            const user = await UserApi.getUser()
            console.log('Got user')
            console.log(user)
            commit('getUserSuccess', user)
        },
        async getTokens({ commit }: { commit: Commit }): Promise<void> {
            console.log('Calling get tokens')
            const tokens = await TokenApi.getTokens()
            console.log('Got tokens')
            console.log(tokens)
            commit('getTokensSuccess', tokens)
        },
        async newToken({ commit }: { commit: Commit }): Promise<void> {
            console.log('Calling new token')
            const token = await TokenApi.newToken()
            console.log('Got token')
            console.log(token)
            commit('newTokenSuccess', token)
        },
        async getNotifications({ commit }: { commit: Commit }): Promise<void> {
            console.log('Calling get notifications')
            const notifications = await UserApi.getNotifications()
            console.log('Got notifications')
            console.log(notifications)
            commit('getNotificationsSuccess', notifications)
        },
    },
    mutations: {
        clearAll(state: UserState): void {
            localStorage.removeItem('user')
            state.user = undefined
            state.plan = undefined
            state.tokens = []
            state.addons = []
            state.notifications = []
        },
        getUserSuccess(state: UserState, user: User): void {
            console.log('In success')
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
            state.plan = user.plan
            state.tokens = user.tokens
            state.addons = user.addons
            state.notifications = user.notifications
        },
        getTokensSuccess(state: UserState, tokens: Token[]): void {
            console.log('In success')
            console.log(tokens)
            state.tokens = tokens
        },
        newTokenSuccess(state: UserState, token: Token): void {
            console.log('In success')
            console.log(token)
            state.tokens.push(token)
        },
        getNotificationsSuccess(state: UserState, notifications: UserNotification[]): void {
            console.log('In success')
            console.log(notifications)
            state.notifications = notifications
        },
    }
}