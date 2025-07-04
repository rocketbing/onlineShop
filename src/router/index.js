import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/user";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
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
          path: "register",
          component: () => import("@/views/Register.vue"),
          name: "Register",
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
router.beforeEach((to, from) => {
  const userStore = useUserStore();
  let token = userStore.token;
  if (token) {
    return true;
  } else {
    if (to.path == "/login" || to.path == "/register" || to.path == "/test") {
      return true;
    } else {
      return { path: "/login" };
    }
  }
});
export default router;
