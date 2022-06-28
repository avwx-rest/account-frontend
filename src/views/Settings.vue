<template>
    <div>
        <Header title="Settings" />

        <main>
            <Profile v-if="currentUser" :user="currentUser" />

            <section>
                <h2>Notifications</h2>
                <p>The AVWX mailing list will keep you updated on new features and API changes. You'll only get a couple each year, so don't worry about a full inbox.</p>
                <button v-if="currentUser?.subscribed" @click="mailing(false)" :disabled="isSubmitting" class="btn btn-primary">
                    <font-awesome-icon :icon="['far', 'envelope-open']" /> Unsubscribe
                </button>
                <button v-else @click="mailing(true)" :disabled="isSubmitting" class="btn btn-primary">
                    <font-awesome-icon :icon="['far', 'envelope']" /> Subscribe
                </button>
            </section>

            <DangerZone v-if="currentUser" />
        </main>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DangerZone from '@/components/DangerZone.vue'
import Header from '@/components/Header.vue'
import Profile from '@/components/Profile.vue'
import { User } from '@/models/user'
import UserApi from '@/services/user.service'

@Options({
    components: {
        DangerZone,
        Header,
        Profile,
    }
})
export default class Settings extends Vue {
    isSubmitting = false

    get currentUser(): User | undefined {
        return this.$store.state.user.user
    }

    public mailing(subscribe: boolean): void {
        this.isSubmitting = true
        UserApi.mailing(subscribe).then(
            () => this.$store.dispatch('user/getUser').then(
                () => this.isSubmitting = false
            )
        )
    }
}
</script>

<style lang="scss">
h2 {
    color: #4f68ae;
}

section {
    margin-bottom: 1em;
}
</style>