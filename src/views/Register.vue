<template>
  <div class="container d-flex flex-column align-items-start pt-3">
    <h1 class="pb-2 mb-5">Create Account</h1>
    <form class="w-100" @submit.prevent="submitHandler">
      <CustomInput
        v-for="(item, index) in formList"
        :key="index"
        :inputAttrs="item"
        v-model="registForm[item.model]"
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
        <button type="button" class="viewBtn" @click="showPassword">
          <font-awesome-icon :icon="['fas', isShow ? 'eye-slash' : 'eye']" />
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
import CustomInput from "@/components/CustomInput.vue";
import { reactive, ref, computed } from "vue";

const registForm = reactive({
  fname: "",
  lname: "",
  email: "",
  password: "",
  city: "",
  gender: "",
  hobby: [],
  comment: "",
  time: "",
  count: "",
});

const formList = [
  {
    type: "text",
    model: "fname",
    placeholder: "First name",
    pattern: "[A-Za-z]+",
    required: true,
  },
  {
    type: "text",
    model: "lname",
    placeholder: "Last name",
    pattern: "[A-Za-z]+",
    required: true,
  },
  {
    type: "email",
    model: "email",
    placeholder: "Email",
    pattern: "^(\\w)+(\\.\\w+)*@(\\w)+(\\.\\w+)+$",
    required: true,
  },
  {
    type: "select",
    model: "city",
    placeholder: "Choose your city",
    options: ["北京", "上海", "深圳", "南京"],
    required: true,
  },
  {
    type: "radio",
    model: "gender",
    placeholder: "Choose your gender",
    options: ["Male", "Female"],
    required: true,
  },
  {
    type: "checkbox",
    model: "hobby",
    placeholder: "Choose your hobby",
    options: ["basketball", "football", "baseball"],
  },
  {
    type: "textarea",
    model: "comment",
    cols: 30,
    rows: 10,
    placeholder: "Leave your comments",
  },
  {
    type: "date",
    model: "time",
    placeholder: "Pick the date",
    dateShown: "2025-07-08",
    startDate: "1990-01-01",
    endDate: "2050-01-01",
  },
  {
    type: "number",
    model: "count",
    placeholder: "Choose a number",
    minimum: "0",
    maximum: "200",
  },
];
const isShow = ref(false);

const validation = [
  { rule: /[0-9]+/, credit: 20 },
  { rule: /[A-Z]+/, credit: 20 },
  { rule: /[a-z]+/, credit: 20 },
  { rule: /[^A-Za-z0-9]/, credit: 20 },
];

const getPercentage = computed(() => {
  let percentage = 0;
  validation.forEach((item) => {
    if (item.rule.test(registForm.password)) {
      percentage += item.credit;
      if (registForm.password.length >= 15) {
        percentage += 20;
      }
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

function submitHandler() {
  console.log("Form data:", registForm);
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
