<template>
  <div>
    <div class="container pt-3" style="max-width: 640px" v-if="isLoginPage">
      <h1 class="pb-2">Login</h1>
      <div class="d-flex gap-3 py-3 align-items-center">
        <h5 class="mb-0 text-secondary">Don't have an account yet?</h5>
        <a class="text-primary" @click="goToRegister">Create account</a>
      </div>

      <BForm @submit.prevent="logIn">
        <BFormGroup
          class="mb-3"
          v-for="(item, index) in loginList"
          :key="index"
        >
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
            :state="!lv$[item.model].$invalid"
            required
          >
            <BFormInvalidFeedback
              v-if="
                ['email', 'password'].indexOf(item.model) !== -1 &&
                lv$[item.model].required.$invalid
              "
              :state="!lv$[item.model].required.$invalid"
            >
              {{ item.name }} is required
            </BFormInvalidFeedback>
          </CustomInput>
        </BFormGroup>

        <a class="text-primary d-block mb-3" @click="goToRegister">
          Forget your password?
        </a>

        <BButton type="submit" variant="dark" class="w-50 mt-4">
          Sign in
        </BButton>
      </BForm>
    </div>
    <div v-if="!isLoginPage">
      <BContainer
        class="d-flex flex-column align-items-start pt-3"
        style="max-width: 640px"
      >
        <h1 class="pb-2 mb-5">Create Account</h1>
        <BForm @submit.prevent="logIn" class="w-100">
          <!-- Loop over each form field -->
          <template v-for="(item, index) in formList" :key="index">
            <BFormGroup class="position-relative mb-3">
              <div class="position-relative">
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
                  v-model="registForm[item.model]"
                  :state="!rv$[item.model].$invalid"
                >
                  <BFormInvalidFeedback
                    v-if="
                      rv$[item.model].required.$invalid &&
                      item.model !== 'confirmPassword'
                    "
                    :state="!rv$[item.model].required.$invalid"
                  >
                    {{ item.name }} is required
                  </BFormInvalidFeedback>

                  <!-- Email -->
                  <BFormInvalidFeedback
                    v-if="
                      item.model === 'email' && rv$[item.model].email.$invalid
                    "
                    :state="!rv$[item.model].email.$invalid"
                  >
                    Please enter valid email
                  </BFormInvalidFeedback>

                  <!-- First Name -->
                  <BFormInvalidFeedback
                    v-if="
                      ['lname', 'fname'].indexOf(item.model) !== -1 &&
                      rv$[item.model].onlyLetters.$invalid
                    "
                    :state="!rv$[item.model].onlyLetters.$invalid"
                  >
                    {{ rv$[item.model].onlyLetters.$message }}
                  </BFormInvalidFeedback>

                  <!-- Password -->
                  <BFormInvalidFeedback
                    v-if="
                      item.model === 'password' &&
                      rv$[item.model].complexPassword.$invalid
                    "
                    :state="!rv$[item.model].complexPassword.$invalid"
                  >
                    {{ rv$[item.model].complexPassword.$message }}
                  </BFormInvalidFeedback>

                  <!-- Password Confirmation -->
                  <BFormInvalidFeedback
                    v-if="
                      item.model === 'confirmPassword' &&
                      rv$[item.model].sameAs.$invalid
                    "
                    :state="!rv$[item.model].sameAs.$invalid"
                  >
                    Password doesn't matched
                  </BFormInvalidFeedback>
                </CustomInput>
              </div>
            </BFormGroup>
          </template>

          <!-- Submit -->
          <div class="registerBtn d-flex">
            <BButton
              type="submit"
              variant="dark"
              size="lg"
              class="mt-4 submit-btn"
            >
              CREATE
            </BButton>
            <p class="mt-5 mx-5" @click="goToLogin">Back to Login</p>
          </div>
        </BForm>
      </BContainer>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, computed } from "vue";
import { useUserStore } from "@/store/user.js";
import {
  BContainer,
  BForm,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
} from "bootstrap-vue-next";
import CustomInput from "@/components/CustomInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, minLength, email } from "@vuelidate/validators";
import { ElNotification } from "element-plus";
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
const isLoginPage = ref(true);
function goToRegister() {
  isLoginPage.value = false;
}
const rules = {
  email: {
    required,
  },
  password: {
    required,
  },
};
const lv$ = useVuelidate(rules, loginForm);
async function logIn() {
  if (!lv$.value.$invalid) {
    await userStore.reqLogin(loginForm);
    router.push("/account/details");
  } else if (!rv$.value.$invalid) {
    await userStore.reqRegister(uploadForm.value);
    await userStore.reqLogin({
      email: registForm.email,
      password: registForm.password,
    });
    ElNotification({
      type: "success",
      message: "Account created successfully!",
    });
    router.push({ path: "/account/details" });
  } else {
    alert("Please enter all required info");
  }
}
const registForm = reactive({
  fname: "",
  lname: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const uploadForm = computed(() => {
  return {
    username: registForm.fname + " " + registForm.lname,
    email: registForm.email,
    password: registForm.password,
  };
});
// 字段定义（用于动态渲染表单）
const formList = [
  {
    type: "text",
    model: "fname",
    placeholder: "First name",
    name: "First name",
  },
  { type: "text", model: "lname", placeholder: "Last name", name: "Last name" },
  { type: "email", model: "email", placeholder: "Email", name: "Email" },
  {
    type: "password",
    model: "password",
    placeholder: "Enter your password",
    name: "Password",
    needStrength: true,
  },
  {
    type: "password",
    model: "confirmPassword",
    placeholder: "Confirm your password",
    needStrength: true,
  },
];

// 密码绑定
const passwordValue = computed(() => registForm.password);

// 表单验证规则
const registerRules = {
  fname: {
    required,
    onlyLetters: {
      $validator: (value) => {
        if (value) {
          return /^[A-Za-z]+$/.test(value);
        } else {
          return true;
        }
      },
      $message: "Please enter a valid first name",
    },
  },
  lname: {
    required,
    onlyLetters: {
      $validator: (value) => {
        if (value) {
          return /^[A-Za-z]+$/.test(value);
        } else {
          return true;
        }
      },
      $message: "Please enter a valid last name",
    },
  },
  email: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(5),
    complexPassword: {
      $validator: (value) => {
        if (value) {
          const hasUpper = /[A-Z]/.test(value);
          const hasLower = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecial = /[^A-Za-z0-9]/.test(value);
          return hasUpper && hasLower && hasNumber && hasSpecial;
        } else {
          return true;
        }
      },
      $message:
        "Password must contain uppercase, lowercase, number, and special character.",
    },
  },
  confirmPassword: {
    required,
    sameAs: sameAs(passwordValue),
  },
};

const rv$ = useVuelidate(registerRules, registForm);

// 控制密码显示
const isShow = ref(false);

// 提交处理
function register() {
  if (!rv$.value.$invalid) {
    userStore.reqRegister(uploadForm.value);
    ElNotification({
      type: "success",
      message: "Account created successfully!",
    });
    router.push({ path: "/account/details" });
  } else {
    alert("Please fill all information");
  }
}
function goToLogin() {
  isLoginPage.value = true;
}
</script>
<style scoped lang="scss">
a:hover {
  cursor: pointer;
}
.registerBtn {
  font-size: 1.5rem;
  .submit-btn {
    height: 60px;
    width: 50%;
  }
  p {
    margin-left: 50px;
    cursor: pointer;
    color: rgb(71, 71, 71);
    text-align: end;
    text-decoration: underline;
  }
}
</style>
