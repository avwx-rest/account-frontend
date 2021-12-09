<template>
    <p>
        Your email has not yet been verified.<br/>
        <button @click="sendVerify()" :disabled="submitted" class="btn btn-primary">Resend Verification Email</button>
    </p>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useToast } from 'vue-toastification'
import RegisterApi from '@/services/register.service'

@Options({
    props: {
        email: String
    }
})
export default class VerifyEmailForm extends Vue {
    email!: string
    submitted = false

    toast = useToast()

    sendVerify(): void {
        this.submitted = true

        RegisterApi.requestVerify(this.email).then(
            () => this.toast.success('Verification email resent'),
            (error) => {
                console.log(error)
                this.toast.error('Could not resend verification email')
            }
        )
    }
}
</script>