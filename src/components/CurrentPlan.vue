<template>
    <div id="plan">
        <b>Current Plan</b>: {{plan.name}} at <b>${{plan.price}}</b> / month & <b>{{plan.limit/1000}}k</b> calls / day
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Plan } from '@/models/plan'

@Options({})
export default class CurrentPlan extends Vue {
    get plan(): Plan {
        return this.$store.state.user.plan
    }
}
</script>