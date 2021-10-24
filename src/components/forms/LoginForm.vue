<template>
    <Form @submit="handleLogin" :validation-schema="schema">
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
        <div v-if="errortext.length > 0">
            <p>{{ errortext }}</p>
        </div>
        <div>
            <button type="submit" name="action" class="btn btn-primary">Login</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Field, Form, ErrorMessage } from 'vee-validate'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import { Login as LoginData } from '@/models/auth'

@Options({
    components: {
        Form,
        Field,
        ErrorMessage,
    }
})
export default class LoginForm extends Vue {
    errortext = ''
    schema = yup.object().shape({
        email: yup.string().email('Not a valid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    })

    public handleLogin(creds: LoginData): void {
        console.log(creds)
        this.$store.dispatch('auth/login', creds).then(
            () => {
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
