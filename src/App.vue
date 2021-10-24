<template>
    <div id="app">
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <NavBar class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" />
                <main class="col py-3 overflow-scroll">
                    <router-view />
                    <footer>Copyright © 2021 duPont Technologies LLC</footer>
                </main>
            </div>
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
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.container-fluid, .row {
    height: 100%;
}

main {
    height: 100%;
}

footer {
    padding: 0.5rem;
    background-color: #4d5155;
    color: white;
}
</style>
