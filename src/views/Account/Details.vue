<template>
  <div class="col-md-8 container text-start">
    <h2>Order History</h2>
    <h4 v-if="listOfOrder.length === 0">You haven't placed any orders yet.</h4>
  </div>
  <div class="col-md-4">
    <h2>Account Details</h2>
    {{ userStore.username }}
  </div>
</template>
<script lang="js" setup>
import {ref,reactive} from 'vue'
import { useUserStore } from "@/store/user.js";
const userStore = useUserStore();
const listOfOrder = reactive([
    // get account info from the store
])
</script>
<style scoped lang="scss">
.container {
  min-height: 50vh;
}
</style>
