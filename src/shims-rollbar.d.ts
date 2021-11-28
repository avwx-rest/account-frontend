import { Rollbar } from 'rollbar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $rollbar: Rollbar
  }
}