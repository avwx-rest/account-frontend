<template>
    <div>
        <p>Verifying...</p>
        <p v-if="errorText.length > 0">{{ errorText }}</p>
        <p v-if="showVerifyEmail">
            It looks like your verification code is out of date.<br/>
            <VerifyEmailForm email="" />
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { useToast } from 'vue-toast-notification'
import axios, { AxiosError } from 'axios'
import RegisterApi from '@/services/register.service'
import VerifyEmailForm from '@/components/forms/VerifyEmailForm.vue'

@Component({
    components: {
        VerifyEmailForm,
    }
})
class VerifyEmail extends Vue {
    errorText = ''
    showVerifyEmail = false
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
                    if (error.response?.status == 401 || error.response?.status == 422) {
                        this.showVerifyEmail = true
                    } else {
                        this.errorText = error.response?.data?.detail || "An unknown error occurred"
                    }
                } else {
                    this.errorText = "An unknown error occurred"
                }
            }
        )
    }
}

export default toNative(VerifyEmail)
</script>
