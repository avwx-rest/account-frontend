import { createWebHistory, createRouter } from "vue-router";
import Manage from "./components/Manage.vue";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Account = () => import("./components/Account.vue")
const EditUserProfile = () => import("./components/EditUserProfile.vue")
const EditUserPassword = () => import("./components/EditUserPassword.vue")
const ForgotPassword = () => import("./components/ForgotPassword.vue")
const TokenHistory = () => import("./components/TokenHistory.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/manage",
    component: Manage,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/account",
    name: "account",
    component: Account,
  },
  {
    path: "/user/edit_user_profile",
    name: "user",
    component: EditUserProfile,
  },
  {
    path: "/user/change-password",
    name: "changePassword",
    component: EditUserPassword,
  },
  {
    path: "/user/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/token/history/:token_value",
    name: "token_history",
    component: TokenHistory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register','/user/forgot-password'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;