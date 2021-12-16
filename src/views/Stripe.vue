<template>
    <p>Loading</p>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import UserApi from '@/services/user.service'

@Options({
    props: {
        success: Boolean,
    }
})
export default class Stripe extends Vue {
    success!: boolean

    public mounted(): void {
        UserApi.stripeSuccess(this.success).then(
            () => {
                this.$store.dispatch('user/getUser')
                this.$router.push('/plans')
            },
            (error) => console.log(error)
        )
    }
}
</script>