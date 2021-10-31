<template>
    <div class="container py-3">
        <Header title="Register" />
        <main>
            <RegisterForm />
            <router-link to="/login" class="btn-flat white-text">Already registered? Sign in</router-link>
        </main>
    </div>
</template>

<script lang=ts>
import { Options, Vue } from 'vue-class-component'
import Header from "@/components/Header.vue"
import RegisterForm from '@/components/forms/RegisterForm.vue'

@Options({
    components: {
        Header,
        RegisterForm,
    },
})
export default class Register extends Vue {}
</script>