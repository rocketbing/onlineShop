import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/user";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      children: [
        {
          path: "home",
          component: () => import("@/views/Home.vue"),
          name: "Home",
        },
        {
          path: "main",
          component: () => import("@/views/Main.vue"),
          name: "Main",
        },
        {
          path: "about",
          component: () => import("@/views/About.vue"),
          name: "About",
        },
        {
          path: "login",
          component: () => import("@/views/Login.vue"),
          name: "Login",
        },
        {
          path: "account",
          component: () => import("@/views/Account/Account.vue"),
          name: "Account",
          children: [
            {
              path: "details",
              component: () => import("@/views/Account/Details.vue"),
              name: "Deatils",
            },
            {
              path: "address",
              component: () => import("@/views/Account/Address.vue"),
              name: "Address",
            },
          ],
        },
      ],
    },
    {
      path: "/test",
      component: () => import("@/components/Test.vue"),
      name: "Test",
    },
  ],
});
// router.beforeEach((to, from) => {
//   const userStore = useUserStore();
//   let token = userStore.token;
//   if (token) {
//     return true;
//   } else {
//     if (to.path == "/login" || to.path == "/register") {
//       return true;
//     } else {
//       return { path: "/login" };
//     }
//   }
// });
export default router;
