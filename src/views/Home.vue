<template>
    <div></div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.module'
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component
class Home extends Vue {
    authStore = useAuthStore()

    get loggedIn(): boolean {
        return this.authStore.loggedIn
    }

    public mounted(): void {
        const route = this.loggedIn ? '/tokens' : '/getting-started'
        this.$router.push(route)
    }
}

export default toNative(Home)
</script>
