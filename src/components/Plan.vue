<template>
    <div id="plan">
        <b>Current Plan</b>: {{plan.name}} at <b>${{plan.price}}</b> / month & <b>{{plan.limit/1000}}k</b> calls / day
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Plan as PlanData } from '@/models/plan'

@Options({
    props: {
        plan: { type: Object as PropType<PlanData> },
    }
})
export default class Plan extends Vue {}
</script>