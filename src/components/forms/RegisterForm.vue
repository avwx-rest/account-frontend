<template>
    <Form @submit="register" :validation-schema="schema">
        <div>
            <Field name="email" type="email" id="email" class="white-text validate"/>
            <label for="email" class="white-text">Email</label>
            <ErrorMessage name="email"></ErrorMessage>
        </div>
        <div>
            <Field name="password" type="password" id="password" class="white-text" />
            <label for="password" class="white-text">Password</label>
            <ErrorMessage name="password"></ErrorMessage>
        </div>
        <div>
            <button type="submit" name="action" :disabled="isSubmitting">Sign Up</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useToast } from 'vue-toastification'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import { Login } from '@/models/auth'

@Options({
    components: {
        Form,
        Field,
        ErrorMessage,
    }
})
export default class RegisterForm extends Vue {
    isSubmitting = false
    errorText = ""

    schema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Email is invalid"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Must be at least 8 characters"),
    })
    toast = useToast()

    public register(form: Login): void {
        console.log(form)
        this.$store.dispatch('auth/register', form).then(
            () => {
                this.toast.success('Registered. Check your email to continue')
                this.$router.push("/login")
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