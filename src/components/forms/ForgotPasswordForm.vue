<template>
    <Form @submit="handleForm" :validation-schema="schema">
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" id="email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email" />
            <ErrorMessage name="email" id="emailHelp" class="form-text text-muted" />
        </div>
        <div v-if="errorText.length > 0" class="form-group">
            <p>{{ errorText }}</p>
        </div>
        <div class="form-group">
            <button type="submit" name="action" :disabled="isSubmitting" class="btn btn-primary">Send Reset Email</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useToast } from 'vue-toastification'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import RegisterApi from '@/services/register.service'

interface ForgotData {
    email: string
}

@Options({
    components: {
        Form,
        Field,
        ErrorMessage,
    }
})
export default class ForgotPasswordForm extends Vue {
    errorText = ''
    isSubmitting = false
    schema = yup.object().shape({
        email: yup.string().email('Not a valid email').required('Email is required'),
    })
    toast = useToast()

    public handleForm(form: ForgotData): void {
        this.isSubmitting = true
        RegisterApi.forgotPassword(form.email).then(
            () => {
                this.toast.success('Password reset email is on the way')
                this.$router.push("/")
            },
            (error: Error | AxiosError) => {
                console.log(error)
                if (axios.isAxiosError(error)) {
                    console.log("handle known error code")
                    console.log(error.response?.data)
                    this.errorText = "error"
                } else {
                    console.log("unknown error occured")
                    this.errorText = "An unknown error occurred"
                }
            }
        )
    }
}
</script>

<style lang="scss">
.form-group {
    margin-bottom: 16px;
}
</style>