<template>
    <div>
        <div v-if="userLoaded">
            <CurrentPlan v-bind:plan="plan" />
        </div>
        <TokenList />
    </div>
</template>

<script lang="ts">
import { Plan } from '@/models/plan'
import { User, emptyUser } from '@/models/user'
import { Options, Vue } from 'vue-class-component'
import CurrentPlan from '@/components/CurrentPlan.vue'
import TokenList from '@/components/TokenList.vue'

@Options({
    components: {
        CurrentPlan,
        TokenList,
    }
})
export default class Manage extends Vue {
    user: User = emptyUser

    get userLoaded(): boolean {
        return this.user.email.length > 0
    }

    get storedUser(): User {
        return this.$store.state.user.user
    }

    get plan(): Plan {
        return this.$store.state.user.plan
    }

    public created(): void {
        if (this.storedUser) this.user = this.storedUser
        this.$store.dispatch('user/getUser')
    }
}
</script>