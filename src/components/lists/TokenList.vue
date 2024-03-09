<template>
    <div class="table">
        <div class="thead">
            <div class="tr">
                <span class="td" scope="col">Name</span>
                <span class="td" scope="col">Enabled</span>
                <span class="td" scope="col">Value</span>
                <span class="td" scope="col">Action</span>
            </div>
        </div>

        <div class="tbody">
            <TokenRow v-for="token in tokens" :key="token" v-show="tokens.length > 0" :token="token" @reload="fetchTokens" class="tr" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import TokenRow from '@/components/lists/TokenRow.vue'
import { Token } from '@/models/token'
import { useUserStore } from '@/stores/user.module'

@Component({
    components: {
        TokenRow,
    },
})
class TokenList extends Vue {
userStore = useUserStore()

    get tokens(): Token[] {
        return this.userStore.tokens
    }

    public fetchTokens(): void {
        this.userStore.getTokens()
    }

    public mounted(): void {
        this.fetchTokens()
    }
}

export default toNative(TokenList)
</script>

<style lang="scss">
div {
    .table {
        display: table;
    }
    .thead {
        display: table-header-group;
    }
    .tbody {
        display: table-row-group;
    }
}

form.tr, div.tr {
    display: table-row;
}

span.td {
    display: table-cell;
}

button {
    margin-left: 0.25em;
}
</style>