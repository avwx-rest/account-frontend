<template>
    <Form @submit="handleForm" :validation-schema="schema">
        <div>
            <Field name="password" type="password" id="password" />
            <label for="password">New Password</label>
            <ErrorMessage name="password" />
        </div>
        <div>
            <Field name="confirm" type="password" id="confirm" />
            <label for="confirm">Confirm Password</label>
            <ErrorMessage name="confirm" />
        </div>
        <div v-if="errortext.length > 0">
            <p>{{ errortext }}</p>
        </div>
        <div>
            <button type="submit" name="action">Reset Password</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useToast } from 'vue-toastification'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import RegisterApi from '@/services/register.service'

YupPassword(yup)

interface ResetData {
    password: string
    confirm: string
}

@Options({
    props: {
        token: String,
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    }
})
export default class ResetPasswordForm extends Vue {
    token!: string
    errortext = ''

    schema = yup.object().shape({
        password: yup.string().required('Password is required'),
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    toast = useToast()

    public handleForm(form: ResetData): void {
        console.log(form)
        RegisterApi.resetPassword(this.token, form.password).then(
            () => {
                this.toast.success('Password has been reset. Log in to continue')
                this.$router.push("/login")
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
