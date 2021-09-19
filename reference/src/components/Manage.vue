<template>
  <div class="row mt-100">
    <h4 class="white-text text-center" v-if="authUser !== null">
      <b>Current Plan</b>: {{authUser.plan.name}} at <b>${{authUser.plan.price}}</b> / month & <b>{{authUser.plan.limit/1000}}k</b> calls / day
    </h4>
    <div class="col s4">
      <div class="card">
        <div class="card-content">
          <h3>Hobby</h3>
        </div>
        <div class="card-action">
          <section class="col-md-4">
            <div class="plan">
              <div class="plan-body">
                <h5><b>Free</b></h5>
                <ul class="collection">
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/station" class="blue-text text-darken-2"><i class="material-icons">grade</i> Station Info</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/station-search" class="blue-text text-darken-2"><i class="material-icons">grade</i> Station Search</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/nearest-stations" class="blue-text text-darken-2"><i class="material-icons">grade</i> Nearest Stations</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/metar" class="blue-text text-darken-2"><i class="material-icons">grade</i> METAR</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/taf" class="blue-text text-darken-2"><i class="material-icons">grade</i> TAF</a>
                  </li>
                  <li class="collection-item avatar">
                    <a class="blue-text text-darken-2"><i class="material-icons">grade</i>  <strong>4k</strong> calls per day</a>
                  </li>
                </ul>
                
                <div class="text-center">
                  <a class="btn cyan lighten-1" v-if="currentPlan == 'free'">Current Plan</a>
                  <a class="btn cyan lighten-1" v-else @click="postPlan('free')">Current Plan</a>
                  <a class="btn cyan lighten-1 mt-10" href="https://avwx.docs.apiary.io/">Documentation</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    
    <div class="col s4">
      <div class="card">
        <div class="card-content">
          <h3>Professional</h3>
        </div>
        <div class="card-action">
          <section class="col-md-4">
            <div class="plan">
              <div class="plan-body">
                <h5><b>$10 / month</b></h5>
                <h6><b>Or $110 / year</b></h6>
                <ul class="collection">
                  <li class="collection-item avatar">
                    <a class="blue-text text-darken-2"><i class="material-icons">grade</i> <b>All Hobby features +</b></a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/pirep" class="blue-text text-darken-2"><i class="material-icons">grade</i> PIREP</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/nbm" class="blue-text text-darken-2"><i class="material-icons">grade</i> NBM</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/gfs" class="blue-text text-darken-2"><i class="material-icons">grade</i> GFS</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/multiple-reports" class="blue-text text-darken-2"><i class="material-icons">grade</i> Multiple Reports</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/nearest-reports" class="blue-text text-darken-2"><i class="material-icons">grade</i> Nearest Reports</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/report-search" class="blue-text text-darken-2"><i class="material-icons">grade</i> Report Search</a>
                  </li>
                  <li class="collection-item avatar">
                    <a class="blue-text text-darken-2"><i class="material-icons">grade</i>  <strong>50k</strong> calls per day</a>
                  </li>
                </ul>
                
                <div class="text-center">
                  <a class="btn cyan lighten-1" v-if="currentPlan == 'pro'">Current Plan</a>
                  <a class="btn cyan lighten-1" v-else @click="postPlan('pro')">Start Monthly</a>
                  <a class="btn cyan lighten-1" v-if="currentPlan == 'pro-year'">Current Plan</a>
                  <a class="btn cyan lighten-1 mt-10" v-else @click="postPlan('pro-year')">Start Yearly</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <div class="col s4">
      <div class="card">
        <div class="card-content">
          <h3>Enterprise</h3>
        </div>
        <div class="card-action">
          <section class="col-md-4">
            <div class="plan">
              <div class="plan-body">
                <h5><b>$40 / month</b></h5>
                <h6><b>Or $440 / year</b></h6>
                <ul class="collection">
                  <li class="collection-item avatar">
                    <a class="blue-text text-darken-2"><i class="material-icons">grade</i> <b>All Pro features +</b></a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwx.docs.apiary.io/#reference/0/report-routing" class="blue-text text-darken-2"><i class="material-icons">grade</i> Flight Routing</a>
                  </li>
                  <li class="collection-item avatar">
                    <a href="https://avwxhistory.docs.apiary.io" class="blue-text text-darken-2"><i class="material-icons">grade</i> Historic Reports</a>
                  </li>
                  <li class="collection-item avatar">
                    <a class="blue-text text-darken-2"><i class="material-icons">grade</i> Priority Support</a>
                  </li>
                  <li class="collection-item avatar">
                    <a class="blue-text text-darken-2"><i class="material-icons">grade</i>  <strong>500k</strong> calls per day</a>
                  </li>
                </ul>
                
                <div class="text-center">
                  <a class="btn cyan lighten-1" v-if="currentPlan == 'enterprise'">Current Plan</a>
                  <a class="btn cyan lighten-1" v-else @click="postPlan('enterprise')">Start Monthly</a>
                  <a class="btn cyan lighten-1" v-if="currentPlan == 'enterprise-year'">Current Plan</a>
                  <a class="btn cyan lighten-1 mt-10" v-else @click="postPlan('enterprise-year')">Start Yearly</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    
  </div>
  <hr>
  <div class="row addons">
    <h4 class="white-text text-center">
      <b>Addons</b>
    </h4>
    <div class="col s4" v-for="addon in alladdons" :key="addon">
      <div class="card">
        <div class="card-content">
          <span class="card-title text-center">{{addon.name}}</span>
        </div>
        <div class="card-action">
          <p>{{addon.description}}</p>
          <div class="text-center">
            <a class="btn cyan lighten-1" @click="postAddon(addon.key)">Get <font-awesome-icon icon="sign-out-alt" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <h3 class="text-center white-text">FAQ</h3>
  <div class="">
    <div class="col s6">
      <div class="card faq-card">
        <div class="card-content white-text">
          <span class="card-title">What payment methods are supported?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">Most major credit cards and Apple Pay are accepted. All payments are handled by <a href="https://stripe.com/">Stripe.</a></p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Can I switch my plans after subscribing?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">You can switch your plan at any time. Your API tokens do not need to be changed when switching to another plan.</p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Do you have any options for open-source projects?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">There is an open-source plan available which mirrors the free plan but with a higher call limit. If you are the creator or maintainer of a project currently using AVWX, <a href="mailto:avwx@dupont.dev">email me</a> with a link to your project repo.</p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">What if I need a higher call limit?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">If you need more than what the Enterprise plan provides, <a href="mailto:avwx@dupont.dev">email me</a>so we can make a custom plan (features, calls, pricing) that fits your specific use-case.</p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">What happens if I hit the call limit?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">Currently, the API will return a 429 error code for the remainder of the day. The count is reset at 00:00Z every day. I'm currently working on an opt-in option to allow overage billing instead of cutting access. It should be available by the end of January 2021.</p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">How can I create an API token?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">Once you create an account, there should be a button to generate your first API token. You can create more tokens by pressing the + button in the table header. You can edit details for each token in the list.</p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">How is my API usage calculated?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">All plans can generate as many API tokens as you need. The sum of all token usage counts towards the call limit. For example, a pro plan with two tokens with 20k & 25k calls still has 5k calls remaining in the day.</p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">How do I use the development token?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">Paid plans are given a separate token with 4k calls that doesn't count against their plan limit. Because the token usage is capped, it should not be used for any production systems.</p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">What happens if I refresh an API token?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">Because each API token has a private ID internally, you can refresh a token's value as much as you want. You won't lose any usage data.</p>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="card faq-card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">How do I view my token usage?</span>
        </div>
        <div class="card-action faq-card-action">
          <p class="white-text">You can view the last 30 days of token usage by selecting the chart icons in the token list. Press the header icon to display all tokens or each row for a single token.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import axios from 'axios';
const API_URL = 'https://avwx-account-dev.azurewebsites.net/';

export default {
  name: "Manage",
  data() {
    return {
      content: "",
      authUser: null,
      currentPlan: "",
      alladdons:[]
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
    this.getUserPlan()
    this.getAllAddons()
    this.getUserAddons()
  },
  methods: {
    getAllAddons(){
      const vm = this;
      axios.get(API_URL + 'addon/all').then((response) => {
        vm.alladdons = response.data
      }).catch((err) => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
    getUserAddons(){
      // const vm = this;
      axios.get(API_URL + 'addon',{
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token,
        }
      }).then((response) => {
        console.log(response)
      }).catch((err) => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
    getUserPlan(){
      const vm = this
      axios.get(API_URL + 'plan',
      {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token,
        }
      }).then((response) => {
        vm.currentPlan = response.data.key
      }).catch((err) => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
    postPlan(plan_key){
      axios.post(API_URL + 'plan',{
        key: plan_key
      }, 
      {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token,
        }
      }).then((response) => {
        window.location = response.data.url
      }).catch((err) => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
    postAddon(addon_key){
      axios.post(API_URL + 'addon/' + addon_key, {
        key: addon_key
      }, 
      {
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.access_token,
        }
      }).then((response) => {
        window.location = response.data.url
      }).catch((err) => {
        this.$toast.error(err.response.data.detail, {
          position: "top-right",
        });
      });
    },
  }
};
</script>
<style scoped>
  .collection .collection-item.avatar {
    min-height: 0px !important;
    padding-left: 0px !important;
  }
  i{
    vertical-align: bottom;
  }
  .card .card-content{
    padding: 10px !important;
  }
  .faq-card, .faq-card-action{
    background: #e96443;
    background: -webkit-linear-gradient(to right, #904e95, #e96443);
    background: linear-gradient(to right, #904e95, #e96443);
  }
  p {
    font-family: monospace;
  }
  .addons .card-content{
    background: antiquewhite;
  }
</style>