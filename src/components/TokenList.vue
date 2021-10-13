<template>
    <button type="submit" name="action" @click="newToken">Add new token</button>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Enabled</th>
                <th>Value</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="token in tokens" :key="token" v-show="tokens.length > 0">
                <TokenRow v-bind:token="token" @reload="fetchTokens" />
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import TokenRow from './TokenRow.vue'
import { Token } from '@/models/token'

@Options({
    components: {
        TokenRow,
    },
})
export default class TokenList extends Vue {
    get tokens(): Token[] {
        return this.$store.state.user.tokens
    }

    public fetchTokens(): void {
        this.$store.dispatch('user/getTokens')
    }

    public newToken(): void {
        this.$store.dispatch('user/newToken')
    }

    public mounted(): void {
        this.fetchTokens()
    }
}
</script>