<template>
    <td>{{ token.name }}</td>
    <td>
        <font-awesome-icon v-if="token.active" icon="check-circle" />
        <font-awesome-icon v-else icon="times-circle" />
    </td>
    <td>{{ token.value }}</td>
    <td>
        <button @click="refreshToken"><font-awesome-icon icon="sync-alt" /></button>
        <button @click="editToken"><font-awesome-icon icon="edit" /></button>
        <button @click="history"><font-awesome-icon icon="history" /></button>
    </td>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Token } from '@/models/token'

@Options({
    props: {
        token: { type: Object as PropType<Token> }
    }
})
export default class TokenRow extends Vue {
    public refreshToken(): void {
        console.log("Refresh token")
    }

    public editToken(): void {
        console.log("Edit token")
    }

    public updateToken(): void {
        console.log("Update token")
    }

    public deleteToken(): void {
        console.log("Delete token")
    }

    public history(): void {
        console.log("Token History")
    }
}
</script>