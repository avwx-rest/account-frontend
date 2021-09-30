<template>
    <div>
        <div v-if="userLoaded">
            <b>Current Plan</b>: {{user.plan.name}} at <b>${{user.plan.price}}</b> / month & <b>{{user.plan.limit/1000}}k</b> calls / day
        </div>
    </div>
</template>

<script lang="ts">
import { User, emptyUser } from '@/models/user';
import { Options, Vue } from 'vue-class-component'
import AuthApi from '@/services/auth.service'

@Options({})
export default class Manage extends Vue {
    user: User = emptyUser

    get userLoaded(): boolean {
        return this.user.email.length > 0
    }

    get storedUser(): User {
        return this.$store.state.auth.user
    }

    public created(): void {
        if (this.storedUser) this.user = this.storedUser
        AuthApi.getUser().then(
            user => this.user = user,
            (error) => {
                if (error.response.data.detail == "Signature has expired") {
                    this.$store.dispatch('auth/logout');
                    this.$router.push('/login');
                }
            }
        )
    }
}
</script>