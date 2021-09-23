<template>
  <div class="container">
    <Form @submit="handleLogin" :validation-schema="schema" class="mt-100">
      <div class="input-field col s8">
        <Field
          name="email"
          type="email"
          id="email"
          class="white-text validate"
        />
        <label for="email" class="white-text">Email</label>
        <span class="helper-text" data-error="Email invalid"></span>
      </div>
      <div class="input-field col s8">
        <Field
          name="password"
          type="password"
          id="password"
          class="white-text"
        />
        <label for="password" class="white-text">Password</label>
        <span class="helper-text" data-error="Password invalid"></span>
      </div>
      <div class="input-field col s8">
        <p>
          <label>
            <input type="checkbox" class="white-text" />
            <span class="white-text">Remember me</span>
          </label>
        </p>
      </div>
      <div class="input-field col s8">
        <button class="btn login-btn" type="submit" name="action">Login</button>
      </div>
    </Form>
    <div class="input-field col s8">
      <router-link to="/register" class="btn-flat white-text">New Here? Register</router-link>&nbsp;
      <router-link to="/user/forgot-password" class="btn-flat white-text">Forgot your Password?</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'

interface loginForm {
    email: string
    password: string
}

@Options({
    components: {
        Form,
        Field,
    },
    data: () => {
        const schema = yup.object().shape({
            email: yup.string().required('Email is required'),
            password: yup.string().required('Password is required'),
        })
        return {
            loading: false,
            schema,
        }
    }
})
export default class LoginForm extends Vue {
    public created(): void {
        if (this.loggedIn) {
            this.$router.push('/account')
        }
    }
    
    get loggedIn(): boolean {
        return false
    }

    public handleLogin(creds: loginForm): void {
        console.log(creds)
    }
}
</script>
