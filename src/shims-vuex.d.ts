import { ComponentCustomProperties } from 'vue'
import { Store } from '@/store'
import { AuthState } from './store/auth.module'
import { PublicState } from './store/public.module'
import { UserState } from './store/user.module'

declare module '@vue/runtime-core' {
    interface State {
        auth: AuthState
        publicdata: PublicState
        user: UserState
    }
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}