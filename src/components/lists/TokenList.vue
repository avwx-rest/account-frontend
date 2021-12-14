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
import { Options, Vue } from 'vue-class-component'
import TokenRow from '@/components/lists/TokenRow.vue'
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

    public mounted(): void {
        this.fetchTokens()
    }
}
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