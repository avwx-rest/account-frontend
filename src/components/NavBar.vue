<template>
    <nav class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a href="https://avwx.rest" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img src="../assets/avwx-logo-40-white.png" class="fs-5 d-none d-sm-inline" />
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
                <router-link to="/getting-started" class="nav-link align-middle px-0">
                    <font-awesome-icon icon="rocket" class="fs-4" /> <span class="ms-1 d-none d-sm-inline">Getting Started</span>
                </router-link>
            </li>
            <li v-if="loggedIn" class="nav-item">
                <router-link to="/tokens" class="nav-link align-middle px-0">
                    <font-awesome-icon icon="key" class="fs-4" /> <span class="ms-1 d-none d-sm-inline">Access Tokens</span>
                </router-link>
            </li>
            <li v-if="loggedIn" class="nav-item">
                <router-link to="/api-usage" class="nav-link align-middle px-0">
                    <font-awesome-icon icon="chart-line" class="fs-4" /> <span class="ms-1 d-none d-sm-inline">API Usage</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/plans" class="nav-link align-middle px-0">
                    <font-awesome-icon icon="th-list" class="fs-4" /> <span class="ms-1 d-none d-sm-inline">Plans</span>
                </router-link>
            </li>
            <li v-if="showBilling" class="nav-item">
                <a @click="getBilling()" class="nav-link align-middle px-0">
                    <font-awesome-icon icon="credit-card" class="fs-4" /> <span class="ms-1 d-none d-sm-inline">Billing</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="https://support.avwx.rest" class="nav-link align-middle px-0">
                    <font-awesome-icon icon="concierge-bell" class="fs-4" /> <span class="ms-1 d-none d-sm-inline">Support</span>
                </a>
            </li>
            <!-- <li>
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
            </li> -->
        </ul>
        <hr>
        <div v-if="loggedIn" class="dropdown pb-4">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon icon="user-circle" />
                <span class="d-none d-sm-inline mx-1">{{ name }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Notifications</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><router-link to="/logout" class="dropdown-item">Sign out</router-link></li>
            </ul>
        </div>
        <div v-else class="pb-4">
            <router-link to="/login" class="d-flex align-items-center text-white text-decoration-none">Sign in</router-link>
            <router-link to="/register" class="d-flex align-items-center text-white text-decoration-none">Create Account</router-link>
        </div>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
// import NotificationList from '@/components/NotificationList.vue'
import UserApi from '@/services/user.service'

@Options({
    components: {
        // NotificationList,
    }
})
export default class NavBar extends Vue {
    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }

    get showBilling(): boolean {
        return Boolean(this.$store.state.user.user?.stripe?.customer_id)
    }

    get name(): string {
        return this.$store.state.user.user?.first_name || this.$store.state.user.user?.email || "User"
    }

    public getBilling(): void {
        let newWindow: Window | null
        if (this.$store.state.user.user?.stripe?.customer_id) newWindow = window.open()
        UserApi.stripePortal().then(
            (url) => {
                console.log(url)
                if (url && newWindow) {
                    newWindow.location.href = url
                }
            },
            (error) => console.log(error),
        )
    }
}
</script>

<style lang="scss">
nav {
    height: 100%;
    padding: 30px;
    max-width: 300px;
    background-color: black !important;

    a {
        color: white !important;

        &.router-link-exact-active {
            background-color: #4f68ae;
        }

        // &:hover {
        //     background-color: #4f68ae !important;
        // }

        svg {
            color: #4f68ae !important;
        }
    }
}
</style>