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
import { Component, Vue, toNative } from 'vue-facing-decorator'
import Header from "@/components/Header.vue"
import RegisterForm from '@/components/forms/RegisterForm.vue'

@Component({
    components: {
        Header,
        RegisterForm,
    },
})
class Register extends Vue {}

export default toNative(Register)
</script>