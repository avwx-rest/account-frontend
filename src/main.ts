import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import setupAuthInterceptors from '@/services/setupInterceptors'
import { FontAwesomeIcon } from './plugins/font-awesome'
import { rollbar } from '@/plugins/rollbar'
import { LogArgument } from 'rollbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import App from './App.vue'
import router from './router'

setupAuthInterceptors()
const pinia = createPinia()

const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(ToastPlugin, {
        position: "top-right",
    })
    .use(VueReCaptcha, {
        siteKey: process.env.RECAPTCHA_PUBLIC_KEY,
        loaderOptions: {},
    })
    .component("font-awesome-icon", FontAwesomeIcon)

app.config.errorHandler = (err) => {
    rollbar.error(err as LogArgument)
    throw err
}

app.mount('#app')
