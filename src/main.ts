import { createApp } from 'vue'
import Toast, { PluginOptions as ToastOptions, POSITION } from 'vue-toastification'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import App from './App.vue'
import router from './router'
import store from './store'
import setupAuthInterceptors from '@/services/setupInterceptors'
import { FontAwesomeIcon } from './plugins/font-awesome'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'vue-toastification/dist/index.css'

const toastDefaults: ToastOptions = {
    position: POSITION.TOP_RIGHT,
}

setupAuthInterceptors()

createApp(App)
    .use(store)
    .use(router)
    .use(Toast, toastDefaults)
    .use(VueReCaptcha, { siteKey: "6LehxkcdAAAAANFvo-hsk5QtqspE9pOp7MXXGWx0" })
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
