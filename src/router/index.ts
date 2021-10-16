import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
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
  {
    path: '/plans',
    name: 'Plans',
    component: () => import(/* webpackChunkName: "plans" */ '../views/Plans.vue')
  },
  {
    path: '/stripe/success',
    name: 'StripeSuccess',
    component: () => import(/* webpackChunkName: "stripe" */ '../views/Stripe.vue'),
    props: { success: true }
  },
  {
    path: '/stripe/cancel',
    name: 'StripeCancel',
    component: () => import(/* webpackChunkName: "stripe" */ '../views/Stripe.vue'),
    props: { success: false }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
