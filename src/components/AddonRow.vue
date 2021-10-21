<template>
    <h3>{{ addon.name }}</h3>
    <p>{{ addon.description }}</p>
    <div v-if="loggedIn">
        <button v-if="userHasAddon" @click="removeAddon">Remove</button>
        <button v-else @click="addAddon">Add to plan</button>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Addon } from '@/models/addon'
import PlanApi from '@/services/plan.service'

@Options({
    props: {
        addon: { type: Object as PropType<Addon> }
    },
    emits: ['reloadUser'],
})
export default class AddonDetail extends Vue {
    addon!: Addon

    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }

    get userAddons(): Addon[] {
        return this.$store.state.user.addons || []
    }

    get userKeys(): string[] {
        return this.userAddons.map(addon => addon.key)
    }

    get userHasAddon(): boolean {
        return this.userKeys.includes(this.addon.key)
    }

    public addAddon(): void {
        let newWindow: Window | null
        if (!this.$store.state.user.user?.stripe?.subscription_id) newWindow = window.open()
        PlanApi.addAddon(this.addon.key).then(
            (url) => {
                if (url && newWindow) {
                    newWindow.location.href = url
                } else {
                    this.$emit('reloadUser')
                }
            },
            (error) => console.log(error),
        )
    }

    public removeAddon(): void {
        PlanApi.removeAddon(this.addon.key).then(
            () => this.$emit('reloadUser'),
            (error) => console.log(error),
        )
    }
}
</script>