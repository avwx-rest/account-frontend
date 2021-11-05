<template>
    <TokenEditForm v-if="edit" :token="token" @update="updateToken" @cancel="cancelEdit" @delete="deleteToken" scope="row" />
    <div v-else  scope="row">
        <span class="td">{{ token.name }}</span>
        <span class="td">
            <font-awesome-icon v-if="token.active" :icon="['far', 'check-circle']" style="color: green;" />
            <font-awesome-icon v-else :icon="['far', 'times-circle']" style="color: red;" />
            <font-awesome-icon v-if="token.type == 'dev'" :icon="['fab', 'dev']" style="color: #4f68ae; margin-left: 5px;" />
        </span>
        <span class="td">{{ token.value }}</span>
        <span class="td">
            <button @click="refreshToken" class="btn btn-primary"><font-awesome-icon icon="sync-alt" /></button>
            <button @click="editToken" class="btn btn-primary"><font-awesome-icon icon="edit" /></button>
            <!-- <button @click="history" class="btn btn-primary"><font-awesome-icon icon="history" /></button> -->
        </span>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import TokenEditForm from '@/components/forms/TokenEditForm.vue'
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