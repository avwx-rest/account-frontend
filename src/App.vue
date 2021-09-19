<template>
  <div id="app">
    <nav v-if="this.$router.currentRoute.value.path !== '/'">
      <div class="nav-wrapper">
        <ul class="left hide-on-med-and-down">
          <li><router-link to="/"><img src="@/assets/logo.png" height="30" class="logo"></router-link></li>
          <li><router-link to="/manage">Account Management</router-link></li>
        </ul>
        
        <ul class="right hide-on-med-and-down" v-if="!currentUser">
          <li><router-link to="/register">Create Account</router-link></li>
          <li><router-link to="/login">Log In</router-link></li>
        </ul>
        <ul class="right hide-on-med-and-down" v-if="currentUser">
          <li><router-link v-if="currentUser" to="/account" class="btn-flat white-text">Account</router-link></li>
          <li><router-link v-if="currentUser" to="/user/edit_user_profile" class="btn-flat white-text">Edit profile</router-link></li>
          <li>
            <a @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" /> LogOut
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <nav v-else>
      <div class="nav-wrapper">
        <ul class="left hide-on-med-and-down">
          <li><router-link to="/"><img src="@/assets/avwx-logo-40-white.png" height="30" class="logo"></router-link></li>
        </ul>
        
        <ul class="left hide-on-med-and-down">
          <li><a class="nav-link" href="https://avwx.docs.apiary.io">Docs</a></li>
          <li><router-link to="/manage">Pricing</router-link></li>
          <li><router-link to="/manage">Account</router-link></li>
          <li><a class="nav-link" href="https://support.avwx.rest">Support</a></li>
          <li><a class="nav-link" href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="container">
    <router-view />
  </div>
  <footer class="white-text footer">
    Copyright © 2021 duPont Technologies LLC
  </footer>
</template>

<script>
import M from 'materialize-css'
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    M.AutoInit();
  }
};
</script>
<style >
  .error-feedback {
    color: red;
  }
  nav, .footer{
    background: #c63916;
    background: -webkit-linear-gradient(to right, #904e95, #e96443);
    background: linear-gradient(to right, #744d77, #c26f5a);
  }
  .mt-100{
    margin-top: 100px;
  }
  .mt-50{
    margin-top: 50px;
  }
  .mt-10{
    margin-top: 10px;
  }
  .text-center{
    text-align: center;
  }
  .login-btn{
    background: repeating-linear-gradient(45deg, #6d1e1e, transparent 100px);
  }
  .mr-5{
    margin-right: 5px;
  }
  .logo{
    vertical-align: middle;
  }
  footer{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 10px;
  }
</style>