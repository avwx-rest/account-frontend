<template>
    <div>
        <p>Page could not be found</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component
class NotFound extends Vue {}

export default toNative(NotFound)
</script>
