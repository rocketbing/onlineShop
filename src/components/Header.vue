<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text text-center">
        <span>$25 Off $100 with Code: EARLYFALL - Exculsion Apply</span>
      </div>
    </div>
    <div class="row mainHeader">
      <div class="col-7">
        <img src="#" alt="公司Logo" />
      </div>
      <div class="col-4">
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div class="col-1 d-flex justify-content-between align-items-center">
        <font-awesome-icon icon="user" @click="goToLogin" class="icon" />
        <font-awesome-icon
          icon="bag-shopping"
          @click="goToMyCart"
          class="icon"
        />
      </div>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">Tree</el-menu-item>
      <el-sub-menu index="2">
        <template #title>CrossBar</template>
        <el-menu-item index="2-1">7-12</el-menu-item>
        <el-menu-item index="2-2">8-14</el-menu-item>
        <el-menu-item index="2-3">9-20</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3">Holiday</el-menu-item>
      <el-menu-item index="4">Clearance</el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const activeIndex = ref("");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
let remaining = ref("");
let timer: number;
function goToLogin() {
  router.push("/login");
}
function goToMyCart() {
  console.log("Go to My Cart");
}
</script>
<style lang="scss" scoped>
.text {
  background-color: #000000;
  color: #ffff;
  height: 50px;
  line-height: 50px;
  span {
    margin: auto;
  }
}
.mainHeader {
  padding: 10px 20px;
  .icon:hover {
    cursor: pointer;
  }
}
</style>
