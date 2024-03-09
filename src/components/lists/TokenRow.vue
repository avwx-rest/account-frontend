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
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import TokenEditForm from '@/components/forms/TokenEditForm.vue'
import { Token, TokenUpdate } from '@/models/token'
import TokenApi from '@/services/token.service'

@Component({
    components: {
        TokenEditForm,
    },
    emits: ["reload"],
})
class TokenRow extends Vue {
    @Prop
    token!: Token
    edit = false

    public refreshToken(): void {
        TokenApi.refreshToken(this.token).then(
            () => this.$emit('reload'),
            (error) => console.log(error),
        )
    }

    public editToken(): void {
        this.edit = true
    }

    public cancelEdit(): void {
        this.edit = false
    }

    public updateToken(form: TokenUpdate): void {
        TokenApi.updateToken(this.token, form).then(
            () => this.$emit('reload'),
            (error) => console.log(error),
        )
    }

    public deleteToken(): void {
        TokenApi.deleteToken(this.token).then(
            () => this.$emit('reload'),
            (error) => console.log(error),
        )
    }

    // public history(): void {
    //     console.log("Token History")
    // }
}

export default toNative(TokenRow)
</script>