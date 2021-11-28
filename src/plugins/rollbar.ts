import Rollbar from 'rollbar'

export const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_API_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true
})
