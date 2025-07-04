<template>
  <div class="container d-flex flex-column align-items-start pt-3">
    <h1 class="pb-2">Login</h1>
    <div class="d-flex gap-3 py-3">
      <h3 class="mb-0 text-secondary">Don't have an account yet?</h3>
      <h3 class="text-primary mb-0 link" @click="goToRegister">
        Create account
      </h3>
    </div>
    <form action="" class="w-100">
      <input
        type="email"
        class="form-control mb-3"
        aria-describedby="emailHelp"
        placeholder="Email"
        pattern="[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}"
        v-model="loginForm.email"
        required
      />
      <input
        type="password"
        class="form-control mb-1"
        placeholder="Password"
        v-model="loginForm.password"
        required
      />
      <h5 class="text-primary mb-3 link" @click="goToRegister">
        Forget your password?
      </h5>
      <button
        type="submit"
        class="btn btn-primary mt-5"
        @submit.prevent="logIn"
      >
        Sign in
      </button>
    </form>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { useUserStore } from "@/store/user.js";
import { ElNotification } from "element-plus";
const userStore = useUserStore();
let loginForm = reactive({ email: "", password: "" });
const router = useRouter();
function goToRegister() {
  router.push("/register");
}
async function logIn() {
  await userStore.reqLogin(loginForm);
  router.push("/");
}
</script>
<style scoped lang="scss">
.container {
  width: 640px;
  height: 510px;
  margin: 50px auto;
  input {
    width: 100%;
    text-align: start;
    padding: 1.5rem;
  }
  .link {
    text-decoration: underline;
    cursor: pointer;
  }
  .btn {
    width: 50%;
  }
}
</style>
