<template>
    <div>
        <p>Verifying...</p>
        <p v-if="errorText.length > 0">{{ errorText }}</p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useToast } from 'vue-toastification'
import axios, { AxiosError } from 'axios'
import RegisterApi from '@/services/register.service'

@Options({})
export default class VerifyEmail extends Vue {
    errorText = ''
    toast = useToast()

    public mounted(): void {
        const token = this.$route.query.t as string || ""
        RegisterApi.verifyEmail(token).then(
            () => {
                this.toast.success('Email has been verified. Log in to continue')
                this.$router.push("/login")
            },
            (error: Error | AxiosError) => {
                console.log(error)
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data)
                    this.errorText = error.response?.data?.detail || "An unknown error occurred"
                } else {
                    this.errorText = "An unknown error occurred"
                }
            }
        )
    }
}
</script>
