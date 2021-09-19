<template>
  <h5 class="white-text text-center">Forgot Password</h5>
  <div class="container">
    <div class="col s6">
      <Form @submit="forgotPassword" :validation-schema="schema">
        <div class="input-field col s6">
          <label for="email" class="white-text">Your email address</label>
          <Field name="email" type="text" class="white-text form-control" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="input-field col s8">
          <button class="btn login-btn" type="submit" name="action">Send reset password email</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "ForgotPassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
    });

    return {
      loading: false,
      schema,
    };
  },
  methods: {
    forgotPassword(user) {
      this.loading = true;
      const vm = this

      this.$store.dispatch("auth/forgotPassword", user).then(
        () => {
          vm.loading = false;
          this.$toast.success("Email sent Successfully", {
            position: "top-right",
          });
        },
        (error) => {
          this.loading = false;
          this.$toast.error(error.response.data.detail, {
            position: "top-right",
          });
        }
      );
    }
  }
};
</script>