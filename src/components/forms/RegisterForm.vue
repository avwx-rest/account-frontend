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
            <p>{{ errorText }}</p>
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
    errorText = ''
    isSubmitting = false

    schema = yup.object().shape({
        email: yup.string().email('Not a valid email').required("Email is required"),
        password: yup.string().password().required("Password is required"),
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    toast = useToast()

    public register(form: RegisterData): void {
        this.isSubmitting = true
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

<style lang="scss">
.form-group {
    margin-bottom: 16px;
}
</style>