<template>
  <div class="container-fluid text-center">
    <div class="row d-flex">
      <h1 class="mb-2">Account</h1>
      <a href="#" class="mb-3" @click="logOut">Log out</a>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="js">
import {RouterView,useRouter} from 'vue-router'
import { useUserStore } from "@/store/user.js";
const router = useRouter();
const userStore = useUserStore();
function logOut() {
    userStore.logOut();
    router.push('/login')
}
</script>
<style scoped lang="scss">
.row {
  padding: 60px 50px 80px;
  font: 16px "Neue Plak", sans-serif;
  color: #212326;
}
</style>
