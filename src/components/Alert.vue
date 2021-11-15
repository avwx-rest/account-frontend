<template>
    <div :class="['alert', 'alert-' + type]" role="alert">
        <font-awesome-icon :icon="icon" />&nbsp;{{ text }}
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

const icons: { [key: string]: string } = {
    'info': 'info-circle',
    'success': 'check-circle',
    'warning': 'exclamation-triangle',
    'danger': 'times-circle',
}

@Options({
    props: {
        type: String,
        text: String,
    }
})
export default class Alert extends Vue {
    type!: string
    text!: string

    get icon(): string {
        return icons[this.type] || 'bell'
    }
}
</script>