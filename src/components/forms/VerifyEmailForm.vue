<template>
    <div>
        <Form v-if="email.length == 0" @submit="sendVerify" :validation-schema="schema">
            <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" type="email" id="email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email" />
                <ErrorMessage name="email" id="emailHelp" class="form-text text-muted" />
            </div>
            <div v-if="errorText.length > 0" class="form-group">
                <Alert type="danger" :text="errorText" />
            </div>
            <div class="form-group">
                <button type="submit" name="action" :disabled="isSubmitting" class="btn btn-primary">Resend Verification Email</button>
            </div>
        </Form>
        <div v-else>
            <button @click="sendVerify({})" :disabled="isSubmitting" class="btn btn-primary">Resend Verification Email</button>
            <Alert v-if="errorText.length > 0" type="danger" :text="errorText" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { useToast } from 'vue-toast-notification'
import { Field, Form, ErrorMessage } from 'vee-validate'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import Alert from '@/components/Alert.vue'
import RegisterApi from '@/services/register.service'

interface EmailForm {
    email?: string
}

@Component({
    components: {
        Alert,
        Form,
        Field,
        ErrorMessage,
    },
})
class VerifyEmailForm extends Vue {
    @Prop
    email!: string
    errorText = ''
    isSubmitting = false

    schema = yup.object().shape({
        email: yup.string().email('Not a valid email').required('Email is required'),
    })
    toast = useToast()

    public sendVerify(form: EmailForm): void {
        this.isSubmitting = true
        const email = form.email || this.email

        RegisterApi.requestVerify(email).then(
            () => {
                this.toast.success('Verification email resent')
                this.$router.push("/login")
            },
            (error: Error | AxiosError) => {
                this.isSubmitting = false
                console.log(error)
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data)
                    this.errorText = error.response?.data?.detail || `An unknown ${error.response?.status} server error occurred`
                } else {
                    this.errorText = "An unknown error occurred"
                    throw error
                }
            }
        )
    }
}

export default toNative(VerifyEmailForm)
</script>