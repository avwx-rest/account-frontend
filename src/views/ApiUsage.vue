<template>
    <div class="container py-3">
        <Header title="API Usage" subtitle="Your daily API usage per token. All records are reported in UTC." />
        <main>
            <div v-if="data">
                <UsageChart :data="data" />
            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import Header from '@/components/Header.vue'
import UsageChart from '@/components/UsageChart.vue'
import { TokenUsage } from '@/models/token'
import TokenApi from '@/services/token.service'
import { useToast } from 'vue-toast-notification'

@Component({
    components: {
        Header,
        UsageChart,
    }
})
class ApiUsage extends Vue {
    data?: TokenUsage[]

    toast = useToast()

    public mounted(): void {
        TokenApi.allHistory().then(
            data => this.data = data,
            error => {
                console.log(error)
                this.toast.error('There was an error loading the usage data')
            },
        )
    }
}

export default toNative(ApiUsage)
</script>