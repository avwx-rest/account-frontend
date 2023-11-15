<template>
    <div></div>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth.module"
import { useUserStore } from "@/stores/user.module"
import { Component, Vue, toNative } from "vue-facing-decorator"

@Component
class Logout extends Vue {
    authStore = useAuthStore()
    userStore = useUserStore()

    public created(): void {
        if (this.loggedIn) {
            Promise.all([
                this.authStore.logout(),
                this.userStore.clear(),
            ]).then(
                () => this.$router.push('/')
            )
        } else {
            this.$router.push('/')
        }
    }
    
    get loggedIn(): boolean {
        return this.authStore.loggedIn
    }
}

export default toNative(Logout)
</script>
