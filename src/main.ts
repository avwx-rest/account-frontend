import { createApp } from 'vue'
import Toast, { PluginOptions as ToastOptions, POSITION } from 'vue-toastification'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from './plugins/font-awesome'
import 'vue-toastification/dist/index.css'

const toastDefaults: ToastOptions = {
    position: POSITION.TOP_RIGHT,
}

createApp(App)
    .use(store)
    .use(router)
    .use(Toast, toastDefaults)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
