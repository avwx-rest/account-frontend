<template>
    <h1>Addons</h1>
    <AddonList />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AddonList from '@/components/AddonList.vue'

@Options({
    components: {
        AddonList,
    }
})
export default class Addons extends Vue {}
</script>