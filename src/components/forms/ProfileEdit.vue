<template>
    <Form @submit="updateUser" :validation-schema="schema">
        <div class="form-group">
            <label for="first_name">First Name</label>
            <Field v-model="user.first_name" name="first_name" type="text" id="first_name" class="form-control" aria-describedby="first_nameHelp" placeholder="Flight" />
            <ErrorMessage name="first_name" id="first_nameHelp" class="form-text text-muted" />
        </div>
        <div class="form-group">
            <label for="last_name">Last Name</label>
            <Field v-model="user.last_name" name="last_name" type="text" id="last_name" class="form-control" aria-describedby="last_nameHelp" placeholder="Chops" />
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

    schema = yup.object().shape({
        first_name: yup.string(),
        last_name: yup.string(),
    })

    public updateUser(user: UserUpdate): void {
        this.isSubmitting = true
        this.$store.dispatch('user/updateUser', user).then(
            () => this.$emit('close')
        )
    }

    public cancel(): void {
        this.$emit('close')
    }
}
</script>