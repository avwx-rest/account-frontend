<template>
    <p>Loading</p>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import UserApi from '@/services/user.service'
import { useUserStore } from '@/stores/user.module'

@Component
class Stripe extends Vue {
    @Prop
    success!: boolean

    userStore = useUserStore()

    public mounted(): void {
        UserApi.stripeSuccess(this.success).then(
            () => {
                this.userStore.getUser()
                this.$router.push('/plans')
            },
            (error) => console.log(error)
        )
    }
}

export default toNative(Stripe)
</script>