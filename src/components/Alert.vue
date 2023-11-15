<template>
    <div :class="['alert', 'alert-' + type]" role="alert">
        <font-awesome-icon :icon="icon" />&nbsp;{{ text }}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

const icons: { [key: string]: string } = {
    'info': 'info-circle',
    'success': 'check-circle',
    'warning': 'exclamation-triangle',
    'danger': 'times-circle',
}

@Component
class Alert extends Vue {
    @Prop
    type!: string
    @Prop
    text!: string

    get icon(): string {
        return icons[this.type] || 'bell'
    }
}

export default toNative(Alert)
</script>