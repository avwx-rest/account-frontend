<template>
    <Form @submit="register" :validation-schema="schema">
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
        <div class="form-group">
            <label for="confirm">Confirm Password</label>
            <Field name="confirm" type="password" id="confirm" class="form-control"  aria-describedby="confirmHelp" placeholder="Confirm password" />
            <ErrorMessage name="confirm" id="confirmHelp" class="form-text text-muted" />
        </div>
        <div v-if="errorText.length > 0" class="form-group">
            <Alert type="danger" :text="errorText" />
        </div>
        <div class="form-group">
            <button type="submit" name="action" :disabled="isSubmitting" class="btn btn-primary">Register</button>
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
import Alert from '@/components/Alert.vue'
import { Register } from '@/models/auth'

YupPassword(yup)

interface RegisterData extends Register {
    confirm: string
}

@Options({
    components: {
        Alert,
        Form,
        Field,
        ErrorMessage,
    }
})
export default class RegisterForm extends Vue {
    errorText = ''
    isSubmitting = false

    schema = yup.object().shape({
        email: yup.string().email('Not a valid email').required("Email is required"),
        password: yup.string().password().required("Password is required"),
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    toast = useToast()

    public async register(form: RegisterData): Promise<void> {
        this.isSubmitting = true
        await this.$recaptchaLoaded()
        const data: Register = {
            email: form.email,
            password: form.password,
            token: await this.$recaptcha('login'),
        }
        this.$store.dispatch('auth/register', data).then(
            () => {
                this.toast.success('Registered. Check your email to continue')
                this.$router.push("/login")
            },
            (error: Error | AxiosError) => {
                this.isSubmitting = false
                console.log(error)
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data)
                    this.errorText = error.response?.data?.detail || "An unknown error occurred"
                } else {
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