<template>
    <div id="app">
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <NavBar class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" />
                <main class="col py-3 overflow-scroll d-flex flex-column min-vh-100">
                    <router-view />
                    <footer class="mt-auto">Copyright © 2024 duPont Technologies LLC</footer>
                </main>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import NavBar from '@/components/NavBar.vue'

@Component({
    components: {
        NavBar,
    },
})
class App extends Vue {}

export default toNative(App)
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
    margin-bottom: -16px;
    margin-right: -12px;
    margin-left: -12px;
}

a {
    color: #4f68ae !important;
}

.btn-primary {
    background-color: #4f68ae !important;
    border-color: #4f68ae !important;
}

.btn-primary:hover {
    background-color: #4d5155 !important;
    border-color: #4d5155 !important;
}

.btn-outline-primary {
    border-color: #4f68ae !important;
    color: #4f68ae !important;
}

.btn-outline-primary:hover {
    border-color: #4d5155 !important;
    color: #4d5155 !important;
}

.btn-secondary {
    background-color: #4d5155 !important;
    border-color: #4d5155 !important;
}

.btn-secondary:hover {
    background-color: #4f68ae !important;
    border-color: #4f68ae !important;
}

.btn-outline-secondary {
    border-color: #4d5155 !important;
    color: #4d5155 !important;
}

.btn-outline-secondary:hover {
    border-color: #4f68ae !important;
    color: #4f68ae !important;
}

.form-group {
    .text-muted {
        color: red !important;
    }
}
</style>
