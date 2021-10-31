<template>
    <header>
        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">{{ title }}</h1>
            <p v-if="subtitle" class="fs-5 text-muted">{{ subtitle }}</p>
        </div>
    </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        title: String,
        subtitle: String,
    }
})
export default class Header extends Vue {
    title!: string
    subtitle?: string
}
</script>

<style lang="scss">
header {
    h1 {
        color: #4f68ae
    }
}
</style>