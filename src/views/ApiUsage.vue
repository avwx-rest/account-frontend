<template>
    <div class="container py-3">
        <Header title="API Usage" subtitle="Your daily API usage per token. All records are reported in UTC." />
        <main>
            <UsageChart />
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import Header from '@/components/Header.vue'
import UsageChart from '@/components/UsageChart.vue'

@Component({
    components: {
        Header,
        UsageChart,
    }
})
class ApiUsage extends Vue {}

export default toNative(ApiUsage)
</script>