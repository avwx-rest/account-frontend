<template>
    <div class="container">
      <div class="col s12">
        <div class="container">
          <Form @submit="handleLogin" :validation-schema="schema" class="mt-100">
            <div class="input-field col s8">
              <Field name="email" type="email" id="email" class="white-text validate"/>
              <label for="email" class="white-text">Email</label>
              <span class="helper-text" data-error="Email invalid"></span>
            </div>
            <div class="input-field col s8">
              <Field name="password" type="password" id="password" class="white-text" />
              <label for="password" class="white-text">Password</label>
              <span class="helper-text" data-error="Password invalid"></span>
            </div>
            <div class="input-field col s8">
              <p><label>
                <input type="checkbox" class="white-text"/>
                <span class="white-text">Remember me</span>
              </label></p>
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
      </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form, Field
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/account");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$toast.success("Successfully Login", {
            position: "top-right",
          });
          this.$router.push("/manage");
        },
        (error) => {
          this.loading = false;
          this.$toast.error(error.response.data.detail, {
            position: "top-right",
          });
        }
      );
    },
  },
};
</script>

<style scoped>
  .profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
  .input:not([type]){
    border-bottom: 1px solid #fff !important;
  }
</style>
