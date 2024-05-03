<template>
    <div>
        <button @click="fetchUser" :disabled="isSubmitting" class="btn btn-primary">Token History</button>
        <div v-if="errorText.length > 0">
            <Alert type="danger" :text="errorText" />
        </div>
        <div v-if="data">
            <UsageChart v-if="data.length > 0" :data="data" />
            <p v-else>No usage during this time period.</p>
        </div>
        <div v-else-if="isSubmitting">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { AxiosError } from 'axios'
import Alert from '@/components/Alert.vue'
import UsageChart from '@/components/UsageChart.vue'
import { TokenUsage } from '@/models/token'
import { WiggleHeader } from '@/models/wiggle'
import WiggleApi from '@/services/wiggle.service'

@Component({
    components: {
        Alert,
        UsageChart,
    }
})
class UserDetailForm extends Vue {
    @Prop
    header!: WiggleHeader
    data?: TokenUsage[]
    isSubmitting = false
    errorText = ''

    public fetchUser(): void {
        this.isSubmitting = true
        WiggleApi.allHistory(this.header).then(
            data => {
                this.data = data
                this.errorText = ''
                this.isSubmitting = false
            },
            (error: Error | AxiosError) => {
                this.errorText = error.message
                this.isSubmitting = false
            }
        )
    }
}

export default toNative(UserDetailForm)
</script>