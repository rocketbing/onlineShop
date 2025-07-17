<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text text-center">
        <span>$25 Off $100 with Code: EARLYFALL - Exculsion Apply</span>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg mainHeader w-100">
      <div class="container-fluid">
        <img class="navbar-brand" src="#" alt="公司Logo" />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
          <div class="navbar-nav d-flex custom-nav-content">
            <font-awesome-icon
              icon="user"
              @click="goToAccount"
              class="icon nav-item"
            />
            <font-awesome-icon
              icon="bag-shopping"
              @click="goToMyCart"
              class="icon nav-item"
            />
            <BForm class="d-flex" role="search" @submit.prevent="searchHandler">
              <CustomInput
                :inputAttrs="{
                  class: 'form-control',
                  type: 'search',
                  placeholder: 'Search',
                }"
              />
              <button class="btn btn-outline-success ms-2" type="submit">
                Search
              </button>
            </BForm>
          </div>
        </div>
      </div>
    </nav>
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
import CustomInput from "./CustomInput.vue";
import { BForm, BButton } from "bootstrap-vue-next";
function searchHandler() {
  console.log(1);
}
const router = useRouter();
const activeIndex = ref("");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
let remaining = ref("");
let timer: number;
function goToAccount() {
  router.push("/account/details");
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
.custom-nav-content {
  flex-direction: column; // 默认竖排（小屏）
  align-items: flex-start;
  gap: 1rem;

  @media (min-width: 992px) {
    // lg 以上屏幕
    flex-direction: row;
    align-items: center;
    margin-left: auto; // 推到右边
  }

  .icon {
    cursor: pointer;
  }
}
</style>
