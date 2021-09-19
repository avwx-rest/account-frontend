<template>
  <div class="">
    <h3 class="white-text">
      <strong>Token Usage</strong>
    </h3>
    <hr>
    <table class="highlight white-text">
      <thead>
        <tr>
          <th>Count</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="history in token_history" :key="history" v-show="token_history.length > 0">
          <td>{{history.count}}</td>
          <td>{{history.date}}</td>
        </tr>
        <tr v-show="token_history.length == 0">
          <td class="text-center">{{history_data_status}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import axios from 'axios';
const API_URL = 'https://avwx-account-dev.azurewebsites.net/';

export default {
  name: 'Token History',
  data() {
    return {
      authUser: "",
      token_history:[],
      history_data_status: "Loading...",
      token_value: this.$router.currentRoute.value.params.token_value
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
      this.getTokenHistory();
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
    getTokenHistory(){
      const vm = this
      axios.get(API_URL + 'token/'+ this.token_value + '/history',
      {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token,
        }
      }).then((response) => {
        vm.token_history = response.data
        if (vm.token_history.length == 0)
          vm.history_data_status = "No history found"
        
      }).catch((err) => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
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
    margin-top: 30px;
    margin-bottom: 30px
  }
  button{
    float: right;
  }
</style>