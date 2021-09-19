<template>
  <h5 class="white-text text-center">Edit profile</h5>
  <div class="col s12">
    <div class="container">
      <Form @submit="handleUserProfile" :validation-schema="schema" class="mt-50">
        <div class="input-field col s8">
          <label for="first_name" class="white-text">First Name</label>
          <Field name="first_name" type="text" class="white-text" v-model="authUser.first_name" />
          <ErrorMessage name="first_name" class="error-feedback" />
        </div>
        <div class="input-field col s8">
          <label for="last_name" class="white-text">Last Name</label>
          <Field name="last_name" type="text" class="white-text" v-model="authUser.last_name" />
          <ErrorMessage name="last_name" class="error-feedback" />
        </div>
        <div class="input-field col s8">
          <button class="btn login-btn">
            Update
          </button>
        </div>
      </Form>
      <div class="input-field col s8">
        <router-link to="/user/change-password" class="btn-flat white-text">Change Password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "EditUserProfile",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      first_name: yup.string().required("First Name is required!"),
      last_name: yup.string().required("Last Name is required!"),
    });

    return {
      loading: false,
      authUser: {
        first_name: null,
        last_name: null
      },
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
    handleUserProfile(user) {
      user["access_token"] = this.currentUser.access_token
      this.loading = true;
      const vm = this

      this.$store.dispatch("auth/updateUser", user).then(
        (response) => {
          vm.loading = false;
          vm.authUser = response;
          this.$toast.success("Profile Updated", {
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