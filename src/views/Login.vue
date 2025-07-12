<template>
  <div class="container pt-3" style="max-width: 640px">
    <h1 class="pb-2">Login1</h1>
    <div class="d-flex gap-3 py-3 align-items-center">
      <h5 class="mb-0 text-secondary">Don't have an account yet?</h5>
      <a class="text-primary" @click="goToRegister">Create account</a>
    </div>

    <BForm @submit.prevent="logIn">
      <BFormGroup class="mb-3" v-for="(item, index) in loginList" :key="index">
        <CustomInput
          :inputAttrs="{
            ...item,
            type:
              item.type === 'password'
                ? isShow
                  ? 'text'
                  : 'password'
                : item.type,
          }"
          v-model="loginForm[item.model]"
          :state="!v$[item.model].$invalid"
          required
        >
          <BFormInvalidFeedback
            v-if="
              ['email', 'password'].indexOf(item.model) !== -1 &&
              v$[item.model].required.$invalid
            "
            :state="!v$[item.model].required.$invalid"
          >
            {{ item.name }} is required
          </BFormInvalidFeedback>
        </CustomInput>
      </BFormGroup>

      <a class="text-primary d-block mb-3" @click="goToRegister">
        Forget your password?
      </a>

      <BButton type="submit" variant="primary" class="w-50 mt-4">
        Sign in
      </BButton>
    </BForm>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { useUserStore } from "@/store/user.js";
import {
  BForm,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
} from "bootstrap-vue-next";
import CustomInput from "@/components/CustomInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const userStore = useUserStore();
const router = useRouter();
const loginList = [
  {
    type: "email",
    model: "email",
    placeholder: "Email",
    name: "Email",
  },
  {
    type: "password",
    model: "password",
    placeholder: "Password",
    name: "Password",
  },
];
let loginForm = reactive({ email: "", password: "" });
function goToRegister() {
  router.push("/register");
}
const rules = {
  email: {
    required,
  },
  password: {
    required,
  },
};
const isShow = ref(false);
const v$ = useVuelidate(rules, loginForm);
async function logIn() {
  if (loginForm.email && loginForm.password) {
    console.log(loginForm);
    await userStore.reqLogin(loginForm);
    router.push("/");
  } else {
    alert("Please enter valid login info");
  }
}
</script>
<style scoped lang="scss">
a:hover {
  cursor: pointer;
}
</style>
