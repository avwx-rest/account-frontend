<template>
    <div v-if="edit">
        <TokenEditForm :token="token" @update="updateToken" @cancel="cancelEdit" @delete="deleteToken" />
    </div>
    <div v-else>
        <td>{{ token.name }}</td>
        <td>
            <font-awesome-icon v-if="token.active" icon="check-circle" />
            <font-awesome-icon v-else icon="minus-circle" />
        </td>
        <td>{{ token.value }}</td>
        <td>
            <button @click="refreshToken"><font-awesome-icon icon="sync-alt" /></button>
            <button @click="editToken"><font-awesome-icon icon="edit" /></button>
            <button @click="history"><font-awesome-icon icon="history" /></button>
        </td>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import TokenEditForm from './forms/TokenEditForm.vue'
import { Token, TokenUpdate } from '@/models/token'
import TokenApi from '@/services/token.service'

@Options({
    props: {
        token: { type: Object as PropType<Token> },
    },
    components: {
        TokenEditForm,
    },
    emits: ["reload"],
})
export default class TokenRow extends Vue {
    token!: Token
    edit = false

    public refreshToken(): void {
        console.log("Refresh token")
        TokenApi.refreshToken(this.token).then(
            () => this.$emit('reload'),
            (error) => console.log(error),
        )
    }

    public editToken(): void {
        console.log("Edit token")
        this.edit = true
    }

    public cancelEdit(): void {
        console.log("Cancel Edit")
        this.edit = false
    }

    public updateToken(form: TokenUpdate): void {
        console.log("Update token")
        console.log(form)
        TokenApi.updateToken(this.token, form).then(
            () => this.$emit('reload'),
            (error) => console.log(error),
        )
    }

    public deleteToken(): void {
        console.log("Delete token")
        TokenApi.deleteToken(this.token).then(
            () => this.$emit('reload'),
            (error) => console.log(error),
        )
    }

    public history(): void {
        console.log("Token History")
    }
}
</script>