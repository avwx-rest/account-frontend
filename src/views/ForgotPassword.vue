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
import { Options, Vue } from 'vue-class-component'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue'
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue'

@Options({
    components: {
        ForgotPasswordForm,
        ResetPasswordForm,
    }
})
export default class ForgotPassword extends Vue {
    token = ""

    public mounted(): void {
        this.token = this.$route.query.t as string || ""
    }

    public created(): void {
        if (this.loggedIn) {
            this.$router.push('/')
        }
    }
    
    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }
}
</script>