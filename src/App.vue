<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <NavBar class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" />
            <router-view class="col py-3" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NavBar from '@/components/NavBar.vue'

@Options({
    components: {
        NavBar,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
