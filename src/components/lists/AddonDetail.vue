<template>
    <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm" v-bind:class="{ 'card-added': userHasAddon }">
            <div class="card-header py-3">
                <h4 class="my-0 fw-normal">{{ addon.name }}</h4>
            </div>
            <div class="card-body">
                <p>{{ addon.description }}</p>
                <div v-if="loggedIn">
                    <button v-if="userHasAddon" @click="removeAddon" class="btn btn-secondary">Remove</button>
                    <button v-else @click="addAddon" class="btn btn-primary">Add to plan</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { useToast } from 'vue-toastification'
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

    toast = useToast()

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
                    this.toast.success(`${this.addon.name} addon added`)
                    this.$emit('reloadUser')
                }
            },
            (error) => {
                console.log(error)
                this.toast.error('There was an error adding the addon')
            },
        )
    }

    public removeAddon(): void {
        PlanApi.removeAddon(this.addon.key).then(
            () => {
                this.toast.success(`${this.addon.name} addon removed`)
                this.$emit('reloadUser')
            },
            (error) => {
                console.log(error)
                this.toast.error('There was an error removing the addon')
            },
        )
    }
}
</script>

<style lang="scss">
.card-added {
    border-color: rgba(#4f68ae, 0.35);

    .card-header {
        background-color: #4f68ae;
        color: white;
    }
}
</style>