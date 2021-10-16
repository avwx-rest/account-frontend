import { Addon } from "./addon"
import { Plan } from "./plan"
import { Token } from "./token"

export interface Stripe {
    customer_id: string
    subscription_id?: string
}

export interface UserNotification {
    id: string
    type: string
    text: string
    timestamp: string
}

export interface UserUpdate {
    email?: string
    first_name?: string
    last_name?: string
}

export interface User extends UserUpdate {
    email: string
    allow_overage: boolean
    subscribed: boolean
    disabled: boolean

    stripe?: Stripe
    plan?: Plan
    tokens: Token[]
    addons: Addon[]
    notifications: UserNotification[]
}

export const emptyUser: User = {
    email: "",
    allow_overage: false,
    disabled: false,
    subscribed: false,
    addons: [],
    notifications: [],
    tokens: [],
}