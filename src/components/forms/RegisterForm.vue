<template>
    <Form @submit="register" :validation-schema="schema">
        <div>
            <Field name="email" type="email" id="email" />
            <label for="email">Email</label>
            <ErrorMessage name="email" />
        </div>
        <div>
            <Field name="password" type="password" id="password" />
            <label for="password">Password</label>
            <ErrorMessage name="password" />
        </div>
        <div>
            <Field name="confirm" type="password" id="confirm" />
            <label for="confirm">Confirm Password</label>
            <ErrorMessage name="confirm" />
        </div>
        <div>
            <button type="submit" name="action" :disabled="isSubmitting" class="btn btn-primary">Sign Up</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useToast } from 'vue-toastification'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { Login } from '@/models/auth'

YupPassword(yup)

interface RegisterData extends Login {
    confirm: string
}

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
        email: yup.string().email('Not a valid email').required("Email is required"),
        password: yup.string().password().required("Password is required"),
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    toast = useToast()

    public register(form: RegisterData): void {
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