<template>
  <h5 class="white-text text-center">Change password</h5>
  <div class="col s12">
    <div class="container">
      <Form @submit="changeUserPassword" :validation-schema="schema">
        <div class="input-field col s8">
          <label for="old_password" class="white-text">Old Password</label>
          <Field name="old_password" type="password" class="white-text" />
          <ErrorMessage name="old_password" class="error-feedback" />
        </div>
        <div class="input-field col s8">
          <label for="new_password" class="white-text">New Password</label>
          <Field name="new_password" type="password" class="white-text" />
          <ErrorMessage name="new_password" class="error-feedback" />
        </div>
        <div class="input-field col s8">
          <label for="confirmed_password" class="white-text">Retype New Password</label>
          <Field name="confirmed_password" type="password" class="white-text" />
          <ErrorMessage name="confirmed_password" class="error-feedback" />
        </div>
        <div class="input-field col s8">
          <button class="btn login-btn">
            Change password
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "EditUserPassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      old_password: yup.string().required("Old password is required!"),
      new_password: yup.string().min(6, "Must be at least 6 characters!").required("New password is required!"),
      confirmed_password: yup.string().min(6, "Must be at least 6 characters!").required("Retype New password is required!"),
    });

    return {
      loading: false,
      authUser: "",
      schema,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    const vm = this;
    UserService.getUserBoard().then(
      (response) => {
        vm.authUser = response.data;
      },
      (error) => {
        if(error.response.data.detail == "Signature has expired")
        {
          this.$store.dispatch('auth/logout');
          this.$router.push('/login');
        }
      }
    );
  },
  methods: {
    changeUserPassword(user) {
      if(user.new_password !== user.confirmed_password)
        this.$toast.error("New password do not match", {
          position: "top-right",
        });
      else
      {
        user["access_token"] = this.currentUser.access_token
        this.loading = true;
        const vm = this

        this.$store.dispatch("auth/resetPassword", user).then(
          (response) => {
            vm.loading = false;
            vm.authUser = response.data;
            this.$toast.success("Password updated", {
              position: "top-right",
            });
            user = ""
          },
          (error) => {
            this.loading = false;
            this.$toast.error(error.response.data.detail, {
              position: "top-right",
            });
          }
        );
      }
    },
  }
};
</script>