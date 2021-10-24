<template>
    <nav class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">AVWX</span>
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
                <router-link to="/getting-started" class="nav-link align-middle px-0">
                    <font-awesome-icon icon="rocket" class="fs-4" /> <span class="ms-1 d-none d-sm-inline">Getting Started</span>
                </router-link>
            </li>
            <li>
                <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle dropdown-toggle">
                    <font-awesome-icon icon="key" class="fs-4 " /> <span class="ms-1 d-none d-sm-inline">Tokens</span> </a>
                <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                    <li class="w-100">
                        <router-link to="/tokens" class="nav-link px-0"> <span class="d-none d-sm-inline">Access Tokens</span> 1 </router-link>
                    </li>
                    <li>
                        <router-link to="/api-usage" class="nav-link px-0"> <span class="d-none d-sm-inline">API Usage</span> 2 </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle dropdown-toggle">
                    <font-awesome-icon icon="credit-card" class="fs-4 " /> <span class="ms-1 d-none d-sm-inline">Pricing</span></a>
                <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                    <li class="w-100">
                        <router-link to="/plans" class="nav-link px-0"> <span class="d-none d-sm-inline">Plans</span> 1</router-link>
                    </li>
                    <li>
                        <router-link to="/addons" class="nav-link px-0"> <span class="d-none d-sm-inline">Addons</span> 2</router-link>
                    </li>
                </ul>
            </li>
        </ul>
        <hr>
        <div class="dropdown pb-4">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon icon="user-circle" />
                <span class="d-none d-sm-inline mx-1">User</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a class="dropdown-item" href="#">New project...</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>

        <NotificationList v-show="loggedIn" />
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NotificationList from '@/components/NotificationList.vue'

@Options({
    components: {
        NotificationList,
    }
})
export default class NavBar extends Vue {
    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }
}
</script>

<style lang="scss">
nav {
    padding: 30px;

    a {
        &.router-link-exact-active {
            background-color: #42b983;
        }
    }
}
</style>