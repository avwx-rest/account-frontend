<template>
    <div class="container py-3">
        <Header title="Login" />
        <main>
            <Alert type="info" text="If you haven't yet logged in to the new account portal, you'll need to reset your password using the Forgot Password link below" />
            <LoginForm @forward="forward" @verify="setVerifyEmail" />
            <router-link to="/register">New Here? Register</router-link>&nbsp;
            <router-link to="/forgot-password">Forgot your Password?</router-link>
            <p v-if="verifyEmail.length != 0">
                Your email has not yet been verified.<br/>
                <VerifyEmailForm :email="verifyEmail" />
            </p>
        </main>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Header from "@/components/Header.vue"
import Alert from '@/components/Alert.vue'
import LoginForm from "@/components/forms/LoginForm.vue"
import  VerifyEmailForm from "@/components/forms/VerifyEmailForm.vue"

@Options({
    components: {
        Alert,
        Header,
        LoginForm,
        VerifyEmailForm,
    }
})
export default class Home extends Vue {
    verifyEmail = ''

    public forward(): void {
        this.$router.push(this.$route.params['nextUrl'] as string || '/')
    }

    public created(): void {
        if (this.loggedIn) {
            this.forward()
        }
    }

    public setVerifyEmail(email: string): void {
        this.verifyEmail = email
    }

    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }
}
</script>
