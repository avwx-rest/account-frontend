<template>
    <div class="container">
        <Form @submit="handleLogin" :validation-schema="schema" class="mt-100">
            <div class="input-field col s8">
                <Field
                    name="email"
                    type="email"
                    id="email"
                    class="white-text validate"
                />
                <label for="email" class="white-text">Email</label>
                <span class="helper-text" data-error="Email invalid"></span>
            </div>
            <div class="input-field col s8">
                <Field
                    name="password"
                    type="password"
                    id="password"
                    class="white-text"
                />
                <label for="password" class="white-text">Password</label>
                <span class="helper-text" data-error="Password invalid"></span>
            </div>
            <div class="input-field col s8">
                <p>
                    <label>
                        <input type="checkbox" class="white-text" />
                        <span class="white-text">Remember me</span>
                    </label>
                </p>
            </div>
            <div class="input-field col s8">
                <button class="btn login-btn" type="submit" name="action">Login</button>
            </div>
        </Form>
        <div v-if="errortext.length > 0">
            <p>{{ errortext }}</p>
        </div>
        <div class="input-field col s8">
            <router-link to="/register" class="btn-flat white-text">New Here? Register</router-link>&nbsp;
            <router-link to="/user/forgot-password" class="btn-flat white-text">Forgot your Password?</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Field, Form } from 'vee-validate'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
// import YupPassword from 'yup-password'
import { Login as LoginData } from '@/models/auth'

// YupPassword(yup) // reserve for registration

@Options({
    components: {
        Form,
        Field,
    }
})
export default class LoginForm extends Vue {
    errortext = ''
    schema = yup.object().shape({
        email: yup.string().email().required('Email is required'),
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
