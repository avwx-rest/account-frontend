<template>
    <div class="container py-3">
        <Header title="Login" />
        <main>
            <Alert type="info" text="If you haven't yet logged in to the new account portal, you'll need to reset your password using the Forgot Password link below" />
            <LoginForm @forward="forward()" />
            <router-link to="/register">New Here? Register</router-link>&nbsp;
            <router-link to="/forgot-password">Forgot your Password?</router-link>
        </main>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Header from "@/components/Header.vue"
import Alert from '@/components/Alert.vue'
import LoginForm from "@/components/forms/LoginForm.vue"

@Options({
    components: {
        Alert,
        Header,
        LoginForm,
    }
})
export default class Home extends Vue {
    public forward(): void {
        this.$router.push(this.$route.params['nextUrl'] as string || '/')
    }

    public created(): void {
        if (this.loggedIn) {
            this.forward()
        }
    }
    
    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }
}
</script>
