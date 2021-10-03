<template>
    <h1>Login</h1>
    <LoginForm />
    <router-link to="/register" class="btn-flat white-text">New Here? Register</router-link>&nbsp;
    <router-link to="/user/forgot-password" class="btn-flat white-text">Forgot your Password?</router-link>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import LoginForm from "@/components/forms/LoginForm.vue"

@Options({
    components: {
        LoginForm,
    },
})
export default class Home extends Vue {
    public created(): void {
        if (this.loggedIn) {
            this.$router.push('/')
        }
    }
    
    get loggedIn(): boolean {
        return this.$store.state.auth.status.loggedIn
    }
}
</script>
