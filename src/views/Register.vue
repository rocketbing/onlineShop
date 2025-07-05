<template>
  <div class="container d-flex flex-column align-items-start pt-3">
    <h1 class="pb-2 mb-5">Create Account</h1>
    <form action="" class="w-100">
      <input
        type="text"
        class="form-control mb-3"
        placeholder="First name"
        v-model="registForm.fname"
        required
      />
      <input
        type="text"
        class="form-control mb-3"
        placeholder="Last name"
        v-model="registForm.lname"
        required
      />
      <input
        type="email"
        class="form-control mb-3"
        placeholder="Email"
        v-model="registForm.email"
        pattern="[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}"
        required
      />
      <div class="mb-3 position-relative">
        <input
          :type="isShow ? 'text' : 'password'"
          class="form-control"
          placeholder="Password"
          v-model="registForm.password"
          ref="passwordInput"
          required
        />
        <button
          type="button"
          class="viewBtn"
          v-if="isShow"
          @click="showPassword"
        >
          <font-awesome-icon :icon="['fas', 'eye-slash']" />
        </button>
        <button
          type="button"
          class="viewBtn"
          v-if="!isShow"
          @click="showPassword"
        >
          <font-awesome-icon :icon="['fas', 'eye']" />
        </button>
      </div>
      <div class="progress">
        <div
          class="progress-bar"
          :class="progressBar"
          role="progressbar"
          :style="{ width: getPercentage + '%' }"
          :aria-valuenow="getPercentage"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ getPercentage }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-3"
        style="height: 60px; font-size: 1.5rem"
      >
        CREATE
      </button>
    </form>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
let registForm = reactive({ fname: "", lname: "", email: "", password: "" });
let passwordInput = ref();
let isShow = ref(true);
let validation = [
  {
    rule: /[0-9]+/,
    credit: 20,
  },
  {
    rule: /[A-Z]+/,
    credit: 20,
  },
  {
    rule: /[a-z]+/,
    credit: 20,
  },
  {
    rule: /[^A-Za-z0-9]/,
    credit: 20,
  },
];
let getPercentage = computed(() => {
  let percentage = 0;
  validation.forEach((item) => {
    if (item.rule.test(registForm.password)) {
      percentage += item.credit;
    }
    if (registForm.password.length >= 15) {
      percentage += 20;
    }
  });
  return percentage > 100 ? 100 : percentage;
});
const progressBar = computed(() => {
  if (getPercentage.value < 40) return "bg-danger";
  if (getPercentage.value < 60) return "bg-warning";
  return "bg-success";
});
function showPassword() {
  isShow.value = !isShow.value;
}
console.log(isShow.value);
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
    height: 50px;
  }
  .btn {
    width: 50%;
  }
  .viewBtn {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    padding: 0;
    color: #999;
    font-size: 1.2rem;
  }
}
</style>
