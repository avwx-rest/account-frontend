<template>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div v-for="addon in addons" :key="addon.key">
            <AddonRow v-bind:addon="addon" @reloadUser="reloadUser" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Addon } from '@/models/addon'
import AddonRow from '@/components/lists/AddonDetail.vue'

@Options({
    components: {
        AddonRow,
    }
})
export default class AddonList extends Vue {
    get addons(): Addon[] {
        return this.$store.state.publicdata.addons
    }

    public mounted(): void {
        this.$store.dispatch('publicdata/getAddons')
    }

    public reloadUser(): void {
        this.$store.dispatch('user/getUser')
    }
}
</script>