<template>
    <div v-for="key in keys" :key="key">
        <PlanDetail v-if="plans[key]" v-bind:plan="plans[key]" @reloadUser="reloadUser" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PlanDetail from '@/components/PlanDetail.vue'
import { PlanMap } from '@/models/plan'

@Options({
    components: {
        PlanDetail,
    },
})
export default class PlanList extends Vue {
    keys = ['free', 'pro', 'enterprise']

    get plans(): PlanMap {
        return this.$store.state.publicdata.plans
    }
    
    public mounted(): void {
        this.$store.dispatch('publicdata/getPlans')
    }

    public reloadUser(): void {
        this.$store.dispatch('user/getUser')
    }
}
</script>