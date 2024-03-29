<template>
    <Form @submit="handleForm" :validation-schema="schema">
        <div class="form-group">
            <label for="password">New Password</label>
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
            <button type="submit" name="action" :disabled="isSubmitting" class="btn btn-primary">Reset Password</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useToast } from 'vue-toast-notification'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import Alert from '@/components/Alert.vue'
import RegisterApi from '@/services/register.service'

YupPassword(yup)

interface ResetData {
    password: string
    confirm: string
}

@Component({
    components: {
        Alert,
        Form,
        Field,
        ErrorMessage,
    }
})
class ResetPasswordForm extends Vue {
    @Prop
    token!: string
    errorText = ''
    isSubmitting = false

    schema = yup.object().shape({
        password: yup.string().required('Password is required'),
        confirm: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
    })
    toast = useToast()

    public handleForm(form: ResetData): void {
        this.isSubmitting = true
        RegisterApi.resetPassword(this.token, form.password).then(
            () => {
                this.toast.success('Password has been reset. Log in to continue')
                this.$router.push("/login")
            },
            (error: Error | AxiosError) => {
                this.isSubmitting = false
                console.log(error)
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data)
                    this.errorText = error.response?.data?.detail || "An unknown server error occurred"
                } else {
                    this.errorText = "An unknown error occurred"
                    throw error
                }
            }
        )
    }
}

export default toNative(ResetPasswordForm)
</script>
