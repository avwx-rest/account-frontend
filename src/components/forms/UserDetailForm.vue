<template>
    <div>
        <button @click="fetchUser" :disabled="isSubmitting" class="btn btn-primary">User Details</button>
        <div v-if="errorText.length > 0">
            <Alert type="danger" :text="errorText" />
        </div>
        <div v-if="user">
            <p>Email: {{ user.email }}</p>
            <p>Plan: {{ user.plan?.name || 'None' }}</p>
            <p>Disabled: {{ user.disabled }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { AxiosError } from 'axios'
import Alert from '@/components/Alert.vue'
import { User } from '@/models/user'
import { WiggleHeader } from '@/models/wiggle'
import WiggleApi from '@/services/wiggle.service'

@Component({
    components: {
        Alert,
    }
})
class UserDetailForm extends Vue {
    @Prop
    header!: WiggleHeader
    user?: User
    isSubmitting = false
    errorText = ''

    public fetchUser(): void {
        this.isSubmitting = true
        WiggleApi.userData(this.header).then(
            user => {
                this.user = user
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