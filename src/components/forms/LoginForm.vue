<template>
    <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" id="email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email" />
            <ErrorMessage name="email" id="emailHelp" class="form-text text-muted" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" id="password" class="form-control"  aria-describedby="passwordHelp" placeholder="Password" />
            <ErrorMessage name="password" id="passwordHelp" class="form-text text-muted" />
        </div>
        <div v-if="errorText.length > 0" class="form-group">
            <Alert type="danger" :text="errorText" />
        </div>
        <div class="form-group">
            <button type="submit" name="action" :disabled="isSubmitting" class="btn btn-primary">Login</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Field, Form, ErrorMessage } from 'vee-validate'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import { Login as LoginData } from '@/models/auth'
import Alert from '@/components/Alert.vue'

@Options({
    components: {
        Alert,
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['forward', 'verify'],
})
export default class LoginForm extends Vue {
    verifyEmail = ''
    errorText = ''
    isSubmitting = false
    schema = yup.object().shape({
        email: yup.string().email('Not a valid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    })

    public handleLogin(creds: LoginData): void {
        this.isSubmitting = true
        this.$store.dispatch('auth/login', creds).then(
            () => this.$emit('forward'),
            (error: Error | AxiosError) => {
                this.isSubmitting = false
                console.log(error)
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data)
                    const errorText = error.response?.data?.detail || "An unknown server error occurred"
                    if (error.response?.status == 400 && errorText == "Email is not yet verified") {
                        this.$emit('verify', creds.email)
                    } else {
                        this.errorText = errorText
                    }
                } else {
                    this.errorText = "An unknown error occurred"
                    throw error
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