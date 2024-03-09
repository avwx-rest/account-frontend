<template>
    <div>
        <Header title="Getting Started" />

        <main>
            <section>
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">1. Create API Token</h4>
                    </div>
                    <div class="card-body">
                        <p>After creating your account, create a new API token from the <router-link to="/tokens">Access Tokens pane</router-link> or pressing the button here.</p>
                        <button type="submit" name="action" @click="newToken" :disabled="!loggedIn" class="btn btn-primary">
                            <font-awesome-icon icon="plus" /> New token
                        </button>
                    </div>
                </div>
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">2. Call the API</h4>
                    </div>
                    <div class="card-body">
                        <p>Include the token value in the Authorization header or as a query parameter to access the API. If you don't see a testing warning in the response metadata, your token works!</p>
                        <ApiCodeSampleForm />
                    </div>
                </div>
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">3. Test Your Application</h4>
                    </div>
                    <div class="card-body">
                        <p>After verifying your token works, you can continue developing your application. The Hobby plan covers most people's development needs, but you may still want access to premium features. Each AVWX endpoint will return sample data, even if it's not included in your plan, allowing you to test the API integration before committing to a paid plan.</p>
                    </div>
                </div>
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">4. Choose Your Plan</h4>
                    </div>
                    <div class="card-body">
                        <p>Once your app is near complete, you may need to upgrade your plan to enable:</p>
                        <ul>
                            <li>A higher daily call limit</li>
                            <li>Live data for premium features</li>
                        </ul>
                        <p>You can change your plan at any time from the <router-link to="/plans">Plans pane</router-link></p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import Header from '@/components/Header.vue'
import ApiCodeSampleForm from '@/components/forms/ApiCodeSampleForm.vue'
import { useAuthStore } from '@/stores/auth.module'
import { useUserStore } from '@/stores/user.module'

@Component({
    components: {
        ApiCodeSampleForm,
        Header,
    }
})
class GettingStarted extends Vue {
    authStore = useAuthStore()
    userStore = useUserStore()

    get loggedIn(): boolean {
        return this.authStore.loggedIn
    }

    public newToken(): void {
        this.userStore.newToken()
    }
}

export default toNative(GettingStarted)
</script>

<style lang="scss">
.card {
    border-color: rgba(#4f68ae, 0.35);

    .card-header {
        background-color: #4f68ae;
        color: white;
    }
}
</style>