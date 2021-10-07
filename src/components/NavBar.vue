<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link v-if="loggedIn" to="/logout">Logout</router-link>
        <router-link v-else to="/login">Login</router-link>
        <NotificationList v-show="loggedIn" />
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NotificationList from '@/components/NotificationList.vue'

@Options({
    components: {
        NotificationList,
    }
})
export default class NavBar extends Vue {
    get loggedIn(): boolean {
        return this.$store.state.auth.status.loggedIn
    }
}
</script>

<style lang="scss">
nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>