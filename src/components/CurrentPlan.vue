<template>
    <div id="plan">
        <b>Current Plan</b>: {{plan.name}} at <b>${{plan.price}}</b> / month & <b>{{plan.limit/1000}}k</b> calls / day
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { Plan } from '@/models/plan'
import { useUserStore } from '@/stores/user.module'

@Component
class CurrentPlan extends Vue {
    userStore = useUserStore()

    get plan(): Plan {
        return this.userStore.plan!
    }
}

export default toNative(CurrentPlan)
</script>