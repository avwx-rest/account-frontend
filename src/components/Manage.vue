<template>
    <div>
        <div v-if="userLoaded">
            <Plan v-bind:plan="user.plan" />
        </div>
        <TokenList />
    </div>
</template>

<script lang="ts">
import { User, emptyUser } from '@/models/user';
import { Options, Vue } from 'vue-class-component'
import UserApi from '@/services/user.service'
import Plan from './Plan.vue'
import TokenList from './TokenList.vue'

@Options({
    components: {
        Plan,
        TokenList,
    }
})
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
        UserApi.getUser().then(
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