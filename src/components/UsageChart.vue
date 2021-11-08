<template>
    <canvas id="tokenChart"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ChartItem } from 'chart.js'
import { DateTime } from 'luxon'
import { useToast } from 'vue-toastification'
import { TokenUsage } from '@/models/token'
import TokenApi from '@/services/token.service'
import Chart from 'chart.js/auto'

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

@Options({})
export default class UsageChart extends Vue {
    toast = useToast()

    public mounted(): void {
        TokenApi.allHistory().then(
            data => this.drawChart(data),
            error => {
                console.log(error)
                this.toast.error('There was an error loading the usage data')
            },
        )
    }

    private dates(since = 30): DateTime[] {
        const offsets = [...Array(since).keys()]
        offsets.reverse()
        const now = DateTime.now().toUTC()
        return offsets.map(i => now.minus({ days: i }))
    }

    private labelForToken(tokenId: string): string {
        for (const token of this.$store.state.user.tokens) {
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
</script>