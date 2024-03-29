<template>
    <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm" :class="{ 'card-added': userHasAddon }">
            <div class="card-header py-3">
                <h4 class="my-0 fw-normal">{{ addon.name }}</h4>
            </div>
            <div class="card-body">
                <p>{{ addon.description }}</p>
                <div v-if="loggedIn">
                    <button v-if="userHasAddon" @click="removeAddon" class="w-100 btn btn-lg btn-secondary">Remove</button>
                    <button v-else @click="addAddon" class="w-100 btn btn-lg btn-primary">Add to plan</button>
                </div>
                <button v-if="addon.documentation" @click="openDocs" class="w-100 btn btn-lg btn-primary">Documentation</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { useToast } from 'vue-toast-notification'
import { Addon } from '@/models/addon'
import PlanApi from '@/services/plan.service'
import { useAuthStore } from '@/stores/auth.module'
import { useUserStore } from '@/stores/user.module'

@Component({
    emits: ['reloadUser'],
})
class AddonDetail extends Vue {
    @Prop
    addon!: Addon

    toast = useToast()
    authStore = useAuthStore()
    userStore = useUserStore()

    get loggedIn(): boolean {
        return this.authStore.loggedIn
    }

    get userAddons(): Addon[] {
        return this.userStore.addons || []
    }

    get userKeys(): string[] {
        return this.userAddons.map(addon => addon.key)
    }

    get userHasAddon(): boolean {
        return this.userKeys.includes(this.addon.key)
    }

    public openDocs(): void {
        if (this.addon.documentation) location.href = this.addon.documentation
    }

    public addAddon(): void {
        let newWindow: Window | null
        if (!this.userStore.user?.stripe?.subscription_id) newWindow = window.open()
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

export default toNative(AddonDetail)
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