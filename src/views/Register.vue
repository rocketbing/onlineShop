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
      <input
        type="password"
        class="form-control mb-3"
        placeholder="Password"
        v-model="registForm.password"
        required
      />
      <div class="progress">
        <div
          v-if="getPercentage() <= 40"
          class="progress-bar bg-primary"
          role="progressbar"
          style="width: 50%"
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ 40 }}
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
import { reactive, ref } from "vue";
let percentage = ref(50);
let registForm = reactive({ fname: "", lname: "", email: "", password: "" });
function getPercentage(password) {}
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
  .btn {
    width: 50%;
  }
}
</style>
