<template>
    <div class="container py-3">
        <header>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-4 fw-normal">Tokens</h1>
                <p class="fs-5 text-muted">Use these tokens to access the API by placing them in your request headers or as a URL parameter. Check the <a href="https://avwx.docs.apiary.io/#introduction/authentication">documentation</a> for more details.</p>
            </div>
        </header>

        <main>
            <TokenList />
            <button type="submit" name="action" @click="newToken" class="btn btn-primary">
                <font-awesome-icon icon="plus" /> New token
            </button>
        </main>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CurrentPlan from '@/components/CurrentPlan.vue'
import TokenList from '@/components/lists/TokenList.vue'

@Options({
    components: {
        CurrentPlan,
        TokenList,
    }
})
export default class Manage extends Vue {
    public newToken(): void {
        this.$store.dispatch('user/newToken')
    }
}
</script>