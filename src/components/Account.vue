<template>
  <div class="">
    <h3 class="white-text">
      <strong>Account Management</strong> (<strong>Tokens</strong>)
    </h3>
    
    <hr>
    <button class="btn login-btn" type="submit" name="action" @click="newToken" v-show="!editTokenForm">Add new token</button>
    <div class="container" v-show="editTokenForm">
      <div class="col s6">
        <Form @submit="updateToken">
          <h6><b>Token:</b> {{token_value}}</h6>
          <div class="input-field col s6">
            <label for="name" class="white-text"></label>
            <Field name="name" type="text" class="white-text form-control" v-model="tkn.name"/>
          </div>
          <div class="input-field col s6">
            <p><label>
              <input type="checkbox" class="white-text" name="active" v-model="tkn.active"/>
              <span class="white-text">Enabled</span>
            </label></p>
          </div>
          <div class="input-field col s8">
            <button class="btn login-btn" type="submit" name="action">Update</button>
          </div>
        </Form>
        <button class="btn login-btn mr-5" type="submit" name="action" @click="deleteToken">Delete</button>
      </div>
    </div>
    <table class="highlight white-text" v-show="!editTokenForm">
      <thead>
        <tr>
            <th>Name</th>
            <th>Enabled</th>
            <th>Value</th>
            <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="token in tokens" :key="token" v-show="tokens.length > 0">
          <td>{{token.name}}</td>
          <td>
            <i class="material-icons" v-if="token.active">check_circle</i>
            <i class="material-icons" v-else>cancel</i>
          </td>
          <td>{{token.value}}</td>
          <td>
            <button class="btn login-btn white-text" @click="refreshToken(token.value)"><i class="material-icons">refresh</i></button>
            <button class="btn login-btn white-text mr-5" @click="editToken(token.value, token.name, token.active)"><i class="material-icons">edit</i></button>
            <button class="btn login-btn white-text mr-5" @click="history(token.value)"><i class="material-icons">insert_chart</i></button>
          </td>
        </tr>
        <tr v-show="currentUser && tokens.length == 0">
          <td>Token</td>
          <td>Yes</td>
          <td>
            {{currentUser.access_token.substring(0, 20)}} ... {{currentUser.access_token.substr(currentUser.access_token.length - 20)}}
          </td>
          <td>
            <button class="btn login-btn white-text" @click="refreshToken(currentUser.access_token)"><i class="material-icons">refresh</i></button>
            <button class="btn login-btn white-text mr-5" @click="editToken(currentUser.access_token, 'Token', true)"><i class="material-icons">edit</i></button>
            <button class="btn login-btn white-text mr-5" @click="history(currentUser.access_token)"><i class="material-icons">insert_chart</i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { Form, Field } from "vee-validate";
import axios from 'axios';
const API_URL = 'https://avwx-account-dev.azurewebsites.net/';

export default {
  name: 'Account',
   components: {
    Form,
    Field
  },
  data() {
    return {
      authUser: "",
      tokens : [],
      editTokenForm: false,
      token_value: null,
      emptyTokenText: "Loading...",
      tkn: {
        name: '',
        active: true
      }
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    else{
      this.getTokens();
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
    }
  },
  methods: {
    getTokens(){
      const vm = this
      axios.get(API_URL + 'token', {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token,
        }
      }).then((response) => {
        vm.tokens = response.data
      }).catch(() => {
        vm.emptyTokenText = "Something went wrong"
      });
    },
    newToken() {
      const vm = this;
      return axios.post(API_URL + 'token', this.currentUser.access_token,
      {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token
        }
      }).then(() => {
        this.$toast.success("Token Updated", {
          position: "top-right"
        });
        vm.getTokens()
      }).catch(err => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
    refreshToken(token_value) {
      const vm = this;
       axios.post(API_URL + 'token/' + token_value + '/refresh',{
          value: token_value
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.currentUser.access_token,
        }
       }).then(() => {
        this.$toast.success("Token refresh", {
          position: "top-right"
        });
        vm.getTokens();
      }).catch(err => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
    editToken(access_token, name, status) {
      this.editTokenForm = true

      this.token_value = access_token
      this.tkn.name = name
      this.tkn.active = status
    },
    updateToken(){
      const vm = this
      axios.patch(API_URL + 'token/' + this.token_value, {
        name: this.tkn.name,
        active: this.tkn.active
      },
      {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token,
        }
      }).then(() => {
        this.$toast.success("Token Updated", {
          position: "top-right"
        });
        vm.editTokenForm = false
        vm.getTokens()
      }).catch(err => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
    deleteToken(){
      const vm = this
      axios.delete(API_URL + 'token/' + this.token_value,
      {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token,
        }
      }).then(() => {
        this.$toast.success("Token Deleted", {
          position: "top-right"
        });
        vm.editTokenForm = false
        vm.getTokens()
      }).catch(err => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
    history(token){
      this.$router.push({
        name: 'token_history',
        params: {token_value: token}
      });
    }
  },
};
</script>
<style scoped>
  table{
    background: #e96443;
    background: -webkit-linear-gradient(to right, #904e95, #e96443);
    background: linear-gradient(to right, #904e95, #e96443);
    margin-top: 60px
  }
  button{
    float: right;
  }
</style>