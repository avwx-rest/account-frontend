<template>
    <canvas id="tokenChart"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { ChartItem } from 'chart.js'
import { DateTime } from 'luxon'
import { TokenUsage } from '@/models/token'
import Chart from 'chart.js/auto'
import { useUserStore } from '@/stores/user.module'

interface ChartDataset {
    label: string
    data: number[]
    fill: boolean
    borderColor: string
    tension: number
}

const COLORS = [
    'red',
    'blue',
    'green',
    'purple',
    'yellow',
    'orange',
    'gray',
    'black',
]

@Component
class UsageChart extends Vue {
    @Prop
    data!: TokenUsage[]
    userStore = useUserStore()

    public mounted(): void {
        this.drawChart(this.data)
    }

    private dates(since = 30): DateTime[] {
        const offsets = [...Array(since).keys()]
        offsets.reverse()
        const now = DateTime.now().toUTC()
        return offsets.map(i => now.minus({ days: i }))
    }

    private labelForToken(tokenId: string): string {
        for (const token of this.userStore.tokens) {
            if (token._id == tokenId) return token.name
        }
        return 'Unknown'
    }

    private datasetForToken(index: number, usage: TokenUsage, targets: string[]): ChartDataset {
        const counts: { [key: string]: number } = usage.days.reduce((obj, day) => {
            return {...obj, [day.date]: day.count}
        }, {})
        const data = targets.map(date => counts[date] || 0)
        return {
            label: this.labelForToken(usage.token_id),
            data: data,
            fill: false,
            borderColor: COLORS[index % COLORS.length],
            tension: 0.1,
        }
    }

    public drawChart(data: TokenUsage[]): void {
        const ctx = document.getElementById('tokenChart')
        if (!ctx) return
        const days = this.dates()
        const targets = days.map(date => date.toFormat('yyyy-MM-dd'))
        const datasets = data.map((usage, index) => this.datasetForToken(index, usage, targets))
        new Chart(ctx as ChartItem, {
            type: 'line',
            data: {
                labels: days.map(date => date.toLocaleString({ month: 'short', day: '2-digit' })),
                datasets: datasets,
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        })
    }
}

export default toNative(UsageChart)
</script>