<template>
    <h1>Register</h1>
    <RegisterForm />
    <router-link to="/login" class="btn-flat white-text">Already registered? Sign in</router-link>
</template>

<script lang=ts>
import { Options, Vue } from 'vue-class-component'
import RegisterForm from '@/components/forms/RegisterForm.vue'

@Options({
    components: {
        RegisterForm,
    },
})
export default class Register extends Vue {}
</script>