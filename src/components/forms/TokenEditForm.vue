<template>
    <Form @submit="updateToken" :validation-schema="schema" scope="row">
        <span class="td form-group">
            <Field name="name" type="text" v-model="form.name" class="form-control" />
            <ErrorMessage name="name" />
        </span>
        <span class="td form-group">
            <Field name="active" type="checkbox" v-model="form.active" :value="true" class="form-check-input" />
            <ErrorMessage name="active" />
        </span>
        <span class="td form-group">{{ token.value }}</span>
        <span class="td form-group">
            <button type="submit" name="action" :disabled="isSubmitting" class="btn btn-primary"><font-awesome-icon icon="check-circle" /></button>
            <button @click="cancel" :disabled="isSubmitting" class="btn btn-primary"><font-awesome-icon icon="times-circle" /></button>
            <button @click="deleteToken" :disabled="isSubmitting" class="btn btn-danger"><font-awesome-icon icon="trash" /></button>
        </span>
    </Form>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { Token, TokenUpdate } from '@/models/token'

let emptyForm: TokenUpdate = {
    name: "",
    active: false,
}

@Options({
    props: {
        token: { type: Object as PropType<Token> },
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["update", "cancel", "delete"],
})
export default class Plan extends Vue {
    token!: Token
    form: TokenUpdate = emptyForm
    isSubmitting = false

    schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        active: yup.boolean(),
    })

    public mounted(): void {
        this.form = {
            name: this.token.name,
            active: this.token.active,
        }
    }

    public updateToken(form: TokenUpdate): void {
        if (form.active === undefined) form.active = false
        this.isSubmitting = true
        this.$emit("update", form)
    }

    public cancel(): void {
        this.$emit("cancel")
    }

    public deleteToken(): void {
        this.isSubmitting = true
        this.$emit("delete")
    }
}
</script>