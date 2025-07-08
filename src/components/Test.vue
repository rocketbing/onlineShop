<template>
  <div>
    <input
      type="checkbox"
      value="奥特曼"
      name="toy1"
      id="toy1"
      v-model="registForm.toy"
    />
    <label for="toy1"> 奥特曼</label>
    <input
      type="checkbox"
      value="卡丁轿车"
      name="toy2"
      id="toy2"
      v-model="registForm.toy"
    />
    <label for="toy2"> 卡丁轿车</label>
    <input
      type="checkbox"
      value="小猪佩奇"
      name="toy3"
      id="toy3"
      v-model="registForm.toy"
    />
    <label for="toy3"> 小猪佩奇</label>
  </div>
</template>
<script setup lang="js">
import { reactive, ref } from 'vue'
let registForm = reactive({
  fname: "",
  lname: "",
  email: "",
  password: "",
  city: "",
  gender: "",
  toy: [],
});
</script>
<style scoped>
.container {
  background-color: green;
}
</style>
