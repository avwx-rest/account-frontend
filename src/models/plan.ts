export interface Plan {
    key: string
    name: string
    type: string
    description: string
    price: number
    level: number
    limit: number
    overage: boolean
}

interface FeatureLink {
    text: string
    link?: string
}

export interface PlanDisplayData {
    preface?: string
    yearly?: number
    links: FeatureLink[]
}

export interface PlanData extends Plan, PlanDisplayData {}

export type PlanMap = { [key: string]: PlanData }