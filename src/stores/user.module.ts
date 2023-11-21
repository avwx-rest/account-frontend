import { ref, Ref } from "vue"
import { defineStore } from "pinia"
import { User, UserNotification, UserUpdate } from "@/models/user"
import TokenApi from '@/services/token.service'
import UserApi from '@/services/user.service'
import { Plan } from "@/models/plan"
import { Token } from "@/models/token"
import { Addon } from "@/models/addon"

interface UserState {
    user?: Ref<User>
    plan?: Ref<Plan | undefined>
    tokens: Ref<Token[]>
    addons: Ref<Addon[]>
    notifications: Ref<UserNotification[]>
}

function makeInitialState(): UserState {
    const userString = localStorage.getItem("user")
    if (!userString) {
        return {
            tokens: ref([]),
            addons: ref([]),
            notifications: ref([]),
        }
    }
    const user = JSON.parse(userString) as User
    return {
        user: ref(user),
        plan: ref(user.plan),
        tokens: ref(user.tokens),
        addons: ref(user.addons),
        notifications: ref(user.notifications),
    }
}

export const useUserStore = defineStore("user", {
    state: makeInitialState,
    actions: {
        clear(): void {
            localStorage.removeItem('user')
            this.user = undefined
            this.plan = undefined
            this.tokens = []
            this.addons = []
            this.notifications = []
        },
        async getUser(): Promise<void> {
            const user = await UserApi.getUser()
            localStorage.setItem('user', JSON.stringify(user))
            this.user = user
            this.plan = user.plan
            this.tokens = user.tokens
            this.addons = user.addons
            this.notifications = user.notifications
        },
        async updateUser(form: UserUpdate): Promise<void> {
            const user = await UserApi.updateUser(form)
            localStorage.setItem('user', JSON.stringify(user))
            this.user = user
            this.plan = user.plan
            this.tokens = user.tokens
            this.addons = user.addons
            this.notifications = user.notifications
        },
        async getTokens(): Promise<void> {
            const tokens = await TokenApi.getTokens()
            this.tokens = tokens
        },
        async newToken(): Promise<void> {
            const token = await TokenApi.newToken()
            this.tokens.push(token)
        },
        async getNotifications(): Promise<void> {
            const notifications = await UserApi.getNotifications()
            this.notifications = notifications
        }
    }
})
