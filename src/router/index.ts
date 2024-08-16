import { createRouter, createWebHistory } from "vue-router";

import HomeLayout from "../views/HomeLayout.vue";
import UsersPage from "../views/UserPage.vue";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomeLayout,
      redirect: to => {
        return `/`;
      },
      children: [
        {
          path: "/",
          name: 'HomePage',
          component: () => import('@/views/HomePage.vue'),
        },
        {
          path: "/stripe",
          name: 'StripePage',
          component: () => import('@/views/Stripe/PaymentPage.vue'),
        },
        {
          path: "/success",
          name: 'StripeSuccess',
          component: () => import('@/views/Stripe/PaymentStatus.vue'),
        },
        {
          path: "/failed",
          name: 'StripeFailed',
          component: () => import('@/views/Stripe/PaymentStatus.vue'),
        },
      ]
    },
    {
      path: "/user",
      component: UsersPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.matched[0].path);
  const loggedIn = localStorage.getItem("user");

  //console.log(to.matched, 'matched');
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
