import { createApp } from 'vue'
import Toast, { PluginOptions as ToastOptions, POSITION } from 'vue-toastification'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import setupAuthInterceptors from '@/services/setupInterceptors'
import { FontAwesomeIcon } from './plugins/font-awesome'
import { rollbar } from '@/plugins/rollbar'
import { LogArgument } from 'rollbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

const toastDefaults: ToastOptions = {
    position: POSITION.TOP_RIGHT,
}

setupAuthInterceptors()

const app = createApp(App)
    .use(store)
    .use(router)
    .use(Toast, toastDefaults)
    .use(VueReCaptcha, { siteKey: process.env.RECAPTCHA_PUBLIC_KEY })
    .component("font-awesome-icon", FontAwesomeIcon)

app.config.errorHandler = (err) => {
    rollbar.error(err as LogArgument)
    throw err
}

app.mount('#app')
