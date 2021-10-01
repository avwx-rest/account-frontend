export interface TokenUpdate {
    name: string
    active: boolean
}

export interface Token extends TokenUpdate {
    type: string
    value: string
}

export interface TokenUsage {
    count: number
    date: string
}