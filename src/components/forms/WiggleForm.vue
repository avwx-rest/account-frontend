<template>
    <div class="form-group">
        <p><input v-model="header.root" placeholder="root" class="form-control" /></p>
        <p><input v-model="header.email" placeholder="email" class="form-control" /></p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { WiggleHeader } from '@/models/wiggle'

@Component
class WiggleForm extends Vue {
    @Prop
    header!: WiggleHeader
}

export default toNative(WiggleForm)
</script>