<template>
    <div class="container py-3">
        <Header title="API Usage" subtitle="Your daily API usage per token. All records are reported in UTC." />
        <main>
            <UsageChart />
        </main>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Header from '@/components/Header.vue'
import UsageChart from '@/components/UsageChart.vue'

@Options({
    components: {
        Header,
        UsageChart,
    }
})
export default class ApiUsage extends Vue {}
</script>