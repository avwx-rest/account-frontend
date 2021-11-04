<template>
    <div></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class Home extends Vue {
    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }

    public mounted(): void {
        const route = this.loggedIn ? '/tokens' : '/getting-started'
        this.$router.push(route)
    }
}
</script>
