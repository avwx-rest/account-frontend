import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toaster from "@meforma/vue-toaster";
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import 'material-design-icons/iconfont/material-icons.css'
import { FontAwesomeIcon } from './plugins/font-awesome'

createApp(App)
  .use(router)
  .use(store)
  .use(Toaster)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");