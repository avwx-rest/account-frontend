import Rollbar from 'rollbar'
import { Vue } from 'vue-class-component'

Vue.prototype.$rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_API_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true
})
