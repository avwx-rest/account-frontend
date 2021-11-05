export interface TokenUpdate {
    name: string
    active: boolean
}

export interface Token extends TokenUpdate {
    _id: string
    type: string
    value: string
}

export interface TokenCount {
    count: number
    date: string
}

export interface TokenUsage {
    token_id: string
    days: TokenCount[]
}
