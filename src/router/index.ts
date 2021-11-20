import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthApi from '@/services/auth.service'
import Home from '../views/Home.vue'
import GettingStarted from '@/views/GettingStarted.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/getting-started',
        name: 'GettingStarted',
        component: GettingStarted,
    },

    // Account Actions
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: { guest: true },
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
        meta: { guest: true },
    },
    {
        path: '/forgot-password',
        name: 'Forgot Password',
        component: () => import(/* webpackChunkName: "forgot-password" */ '../views/ForgotPassword.vue'),
        meta: { guest: true },
    },
    {
        path: '/verify-email',
        name: 'Verify Email',
        component: () => import(/* webpackChunkName: "verify-email" */ '../views/VerifyEmail.vue'),
        meta: { guest: true },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
        meta: { requiresAuth: true },
    },
    // API Tokens
    {
        path: '/tokens',
        name: 'Tokens',
        component: () => import(/* webpackChunkName: "tokens" */ '../views/Tokens.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/api-usage',
        name: 'API Usage',
        component: () => import(/* webpackChunkName: "api-usage" */ '../views/ApiUsage.vue'),
        meta: { requiresAuth: true },
    },

    // Products
    {
        path: '/plans',
        name: 'Plans',
        component: () => import(/* webpackChunkName: "plans" */ '../views/Plans.vue'),
    },

    // Checkout
    {
        path: '/stripe/success',
        name: 'StripeSuccess',
        component: () => import(/* webpackChunkName: "stripe-t" */ '../views/Stripe.vue'),
        props: { success: true },
        meta: { requiresAuth: true },
    },
    {
        path: '/stripe/cancel',
        name: 'StripeCancel',
        component: () => import(/* webpackChunkName: "stripe-f" */ '../views/Stripe.vue'),
        props: { success: false },
        meta: { requiresAuth: true },
    },
    {
        path: '/:catchAll(.*)', 
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    // Requires login
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!AuthApi.accessToken) {
            next({
                name: 'Login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    // Requires not login
    } else if (to.matched.some(record => record.meta.guest)) {
        if (AuthApi.accessToken) {
          next({ path: '/' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
