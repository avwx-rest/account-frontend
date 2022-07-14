<template>
    <Form @submit="updateUser" :validation-schema="schema">
        <div class="form-group">
            <label for="email">Email</label>
            <Field v-model="user.email" name="email" type="text" id="email" class="form-control" aria-describedby="emailHelp" placeholder="high@flier.io" />
            <ErrorMessage name="email" id="emailHelp" class="form-text text-muted" />
        </div>
        <div class="form-group">
            <label for="first_name">First Name</label>
            <Field v-model="user.first_name" name="first_name" type="text" id="first_name" class="form-control" aria-describedby="first_nameHelp" placeholder="High" />
            <ErrorMessage name="first_name" id="first_nameHelp" class="form-text text-muted" />
        </div>
        <div class="form-group">
            <label for="last_name">Last Name</label>
            <Field v-model="user.last_name" name="last_name" type="text" id="last_name" class="form-control" aria-describedby="last_nameHelp" placeholder="Flier" />
            <ErrorMessage name="last_name" id="first_nameHelp" class="form-text text-muted" />
        </div>
        <div v-if="errorText.length > 0" class="form-group">
            <p>{{ errorText }}</p>
        </div>
        <div class="form-group">
            <button type="submit" name="action" :disabled="isSubmitting" class="btn btn-primary">Update</button>
            <button @click="cancel" class="btn btn-primary">Back</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useToast } from 'vue-toastification'
import axios, { AxiosError } from 'axios'
import * as yup from 'yup'
import { UserUpdate } from '@/models/user'

@Options({
    props: {
        user: { type: Object as PropType<UserUpdate> },
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['close'],
})
export default class ProfileEdit extends Vue {
    user!: UserUpdate
    errorText = ''
    isSubmitting = false

    toast = useToast()

    schema = yup.object().shape({
        email: yup.string().email('Not a valid email').required("Email is required"),
        first_name: yup.string(),
        last_name: yup.string(),
    })

    public updateUser(user: UserUpdate): void {
        this.isSubmitting = true
        const oldEmail = this.$store.state.user.user.email.slice()
        this.$store.dispatch('user/updateUser', user).then(
            () => {
                if (user.email != oldEmail) {
                    Promise.all([
                        this.$store.dispatch('auth/logout'),
                        this.$store.dispatch('user/clear'),
                    ]).then(
                        () => {
                            this.toast.success("Successfully updated your email. You'll need to log back in to continue")
                            this.$router.push('/')
                        }
                    )
                    
                } else {
                    this.$emit('close')
                }
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
            },
        )
    }

    public cancel(): void {
        this.$emit('close')
    }
}
</script>