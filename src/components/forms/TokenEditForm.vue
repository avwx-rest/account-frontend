<template>
    <Form @submit="updateToken" :validation-schema="schema" v-slot="{ values }">
        <td>
            <Field name="name" type="text" v-model="form.name"/>
            <ErrorMessage name="name"></ErrorMessage>
        </td>
        <td>
            <Field name="active" type="checkbox" v-model="form.active" :value="true" />
            <ErrorMessage name="active"></ErrorMessage>
        </td>
        <td>{{ token.value }}</td>
        <td>
            <button type="submit" name="action" :disabled="isSubmitting"><font-awesome-icon icon="check-circle" /></button>
            <button @click="cancel"><font-awesome-icon icon="times-circle" /></button>
            <button @click="deleteToken" :disabled="isSubmitting"><font-awesome-icon icon="trash" /></button>
        </td>
        <pre>{{ values }}</pre>
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
        console.log("Delete token")
        this.isSubmitting = true
        this.$emit("delete")
    }
}
</script>