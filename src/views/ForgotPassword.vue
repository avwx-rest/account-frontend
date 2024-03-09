<template>
    <div v-if="token.length == 0">
        <h1>Forgot Password</h1>
        <ForgotPasswordForm />
    </div>
    <div v-else>
        <h1>Reset Password</h1>
        <ResetPasswordForm :token="token" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue'
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue'
import { useAuthStore } from '@/stores/auth.module'

@Component({
    components: {
        ForgotPasswordForm,
        ResetPasswordForm,
    }
})
class ForgotPassword extends Vue {
    token = ""

    authStore = useAuthStore()

    public mounted(): void {
        this.token = this.$route.query.t as string || ""
    }

    public created(): void {
        if (this.loggedIn) {
            this.$router.push('/')
        }
    }
    
    get loggedIn(): boolean {
        return this.authStore.loggedIn
    }
}

export default toNative(ForgotPassword)
</script>