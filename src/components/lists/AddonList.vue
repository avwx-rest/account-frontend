<template>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div v-for="addon in addons" :key="addon.key">
            <AddonRow :addon="addon" @reloadUser="reloadUser" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { Addon } from '@/models/addon'
import AddonRow from '@/components/lists/AddonDetail.vue'
import { usePublicStore } from '@/stores/public.module'
import { useUserStore } from '@/stores/user.module'

@Component({
    components: {
        AddonRow,
    }
})
class AddonList extends Vue {
    publicStore = usePublicStore()
    userStore = useUserStore()

    get addons(): Addon[] {
        return this.publicStore.addons
    }

    public mounted(): void {
        this.publicStore.getAddons()
    }

    public reloadUser(): void {
        this.userStore.getUser()
    }
}

export default toNative(AddonList)
</script>