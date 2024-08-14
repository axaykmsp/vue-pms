import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import UsersPage from "../views/UserPage.vue";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
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
