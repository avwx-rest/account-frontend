import { Commit, Module } from "vuex"
import { User, UserNotification, UserUpdate } from "@/models/user"
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

export const user: Module<UserState, any> = {
    namespaced: true,
    state: makeInitialState(),
    actions: {
        clear({ commit }: { commit: Commit }): void {
            commit('clearAll')
        },
        async getUser({ commit }: { commit: Commit }): Promise<void> {
            const user = await UserApi.getUser()
            commit('getUserSuccess', user)
        },
        async updateUser({ commit }: { commit: Commit }, form: UserUpdate): Promise<void> {
            const user = await UserApi.updateUser(form)
            commit('getUserSuccess', user)
        },
        async getTokens({ commit }: { commit: Commit }): Promise<void> {
            const tokens = await TokenApi.getTokens()
            commit('getTokensSuccess', tokens)
        },
        async newToken({ commit }: { commit: Commit }): Promise<void> {
            const token = await TokenApi.newToken()
            commit('newTokenSuccess', token)
        },
        async getNotifications({ commit }: { commit: Commit }): Promise<void> {
            const notifications = await UserApi.getNotifications()
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
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
            state.plan = user.plan
            state.tokens = user.tokens
            state.addons = user.addons
            state.notifications = user.notifications
        },
        getTokensSuccess(state: UserState, tokens: Token[]): void {
            state.tokens = tokens
        },
        newTokenSuccess(state: UserState, token: Token): void {
            state.tokens.push(token)
        },
        getNotificationsSuccess(state: UserState, notifications: UserNotification[]): void {
            state.notifications = notifications
        },
    }
}