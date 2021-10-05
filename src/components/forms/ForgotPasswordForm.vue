<template>
    <Form @submit="handleForm" :validation-schema="schema">
        <div>
            <Field name="email" type="email" id="email" />
            <label for="email">Email</label>
            <ErrorMessage name="email" />
        </div>
        <div v-if="errortext.length > 0">
            <p>{{ errortext }}</p>
        </div>
        <div>
            <button type="submit" name="action">Send Reset Email</button>
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
    errortext = ''
    schema = yup.object().shape({
        email: yup.string().email('Not a valid email').required('Email is required'),
    })
    toast = useToast()

    public handleForm(form: ForgotData): void {
        console.log(form)
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
                    this.errortext = "error"
                } else {
                    console.log("unknown error occured")
                    this.errortext = "An unknown error occurred"
                }
            }
        )
    }
}
</script>