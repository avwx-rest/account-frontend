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
                <TokenRow v-bind:token="token" />
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import TokenRow from './TokenRow.vue'
import { Token } from '@/models/token'
import AuthApi from '@/services/auth.service'

@Options({
    components: {
        TokenRow,
    },
})
export default class TokenList extends Vue {
    tokens: Token[] = []
    editTokenForm = false

    public fetchTokens(): void {
        AuthApi.getTokens().then((tokens) => {
            this.tokens = tokens
        })
    }

    public newToken(): void {
        console.log("New token")
        AuthApi.newToken().then((token) => {
            console.log("Got new token")
            this.tokens.push(token)
        })
    }

    public mounted(): void {
        this.fetchTokens()
    }
}
</script>