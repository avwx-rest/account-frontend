<template>
  <div class="container">
    <div class="col s12">
      <div class="container">
        <Form @submit="handleRegister" :validation-schema="schema" class="mt-100">
          <div v-if="!successful">
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
              <button class="btn login-btn" type="submit" name="action">Sign Up</button>
            </div>
          </div>
        </Form>
        <div class="input-field col s8">
          <router-link to="/login" class="btn-flat white-text">Already registered? Sign in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/account");
    }
  },
  methods: {
    handleRegister(user) {
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        () => {
          this.$toast.success("Registered Successfully", {
            position: "top-right",
          });
          this.successful = true;
          this.loading = false;
          this.$router.push("/account");
        },
        (error) => {
          this.$toast.error(error.response.data.detail, {
            position: "top-right",
          });
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
