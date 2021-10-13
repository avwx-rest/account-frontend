<template>
    <Manage v-if="loggedIn" />
    <div v-else class="home">
        <img alt="AVWX logo" src="../assets/avwx-icon-color.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue'
import Manage from '@/components/Manage.vue'

@Options({
    components: {
        HelloWorld,
        Manage,
    },
})
export default class Home extends Vue {
    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }
}
</script>
