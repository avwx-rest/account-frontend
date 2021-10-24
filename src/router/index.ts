import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import GettingStarted from '@/views/GettingStarted.vue'

const routes: Array<RouteRecordRaw> = [
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
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: () => import(/* webpackChunkName: "forgot-password" */ '../views/ForgotPassword.vue')
  },

  // API Tokens
  {
    path: '/tokens',
    name: 'Tokens',
    component: () => import(/* webpackChunkName: "tokens" */ '../views/Tokens.vue')
  },
  {
    path: '/api-usage',
    name: 'API Usage',
    component: () => import(/* webpackChunkName: "api-usage" */ '../views/ApiUsage.vue')
  },

  // Products
  {
    path: '/plans',
    name: 'Plans',
    component: () => import(/* webpackChunkName: "plans" */ '../views/Plans.vue')
  },
  {
    path: '/addons',
    name: 'Addons',
    component: () => import(/* webpackChunkName: "addons" */ '../views/Addons.vue')
  },

  // Checkout
  {
    path: '/stripe/success',
    name: 'StripeSuccess',
    component: () => import(/* webpackChunkName: "stripe-t" */ '../views/Stripe.vue'),
    props: { success: true }
  },
  {
    path: '/stripe/cancel',
    name: 'StripeCancel',
    component: () => import(/* webpackChunkName: "stripe-f" */ '../views/Stripe.vue'),
    props: { success: false }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
