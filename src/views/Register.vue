<template>
  <BContainer
    class="d-flex flex-column align-items-start pt-3"
    style="max-width: 640px"
  >
    <h1 class="pb-2 mb-5">Create Account</h1>
    <BForm @submit.prevent="submitHandler" class="w-100">
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
              :state="!v$[item.model].$invalid"
            >
              <BFormInvalidFeedback
                v-if="
                  v$[item.model].required.$invalid &&
                  item.model !== 'confirmPassword'
                "
                :state="!v$[item.model].required.$invalid"
              >
                {{ item.name }} is required
              </BFormInvalidFeedback>

              <!-- Email -->
              <BFormInvalidFeedback
                v-if="item.model === 'email' && v$[item.model].email.$invalid"
                :state="!v$[item.model].email.$invalid"
              >
                Please enter valid email
              </BFormInvalidFeedback>

              <!-- First Name -->
              <BFormInvalidFeedback
                v-if="
                  ['lname', 'fname'].indexOf(item.model) !== -1 &&
                  v$[item.model].onlyLetters.$invalid
                "
                :state="!v$[item.model].onlyLetters.$invalid"
              >
                {{ v$[item.model].onlyLetters.$message }}
              </BFormInvalidFeedback>

              <!-- Password -->
              <BFormInvalidFeedback
                v-if="
                  item.model === 'password' &&
                  v$[item.model].complexPassword.$invalid
                "
                :state="!v$[item.model].complexPassword.$invalid"
              >
                {{ v$[item.model].complexPassword.$message }}
              </BFormInvalidFeedback>

              <!-- Password Confirmation -->
              <BFormInvalidFeedback
                v-if="
                  item.model === 'confirmPassword' &&
                  v$[item.model].sameAs.$invalid
                "
                :state="!v$[item.model].sameAs.$invalid"
              >
                Password doesn't matched
              </BFormInvalidFeedback>
            </CustomInput>
          </div>
        </BFormGroup>
      </template>

      <!-- Submit -->
      <BButton type="submit" variant="dark" size="lg" class="mt-3 submit-btn">
        CREATE
      </BButton>
    </BForm>
  </BContainer>
</template>

<script setup>
import CustomInput from "@/components/CustomInput.vue";
import { useRouter } from "vue-router";
import { reactive, ref, computed, watchEffect } from "vue";
import {
  BContainer,
  BForm,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
} from "bootstrap-vue-next";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, minLength, email } from "@vuelidate/validators";
import { useUserStore } from "@/store/user.js";
import { ElNotification } from "element-plus";
const userStore = useUserStore();
const router = useRouter();
// 表单数据
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
const rules = {
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

const v$ = useVuelidate(rules, registForm);

// 控制密码显示
const isShow = ref(false);

// 提交处理
function submitHandler() {
  if (!v$.value.$invalid) {
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
</script>

<style scoped lang="scss">
.submit-btn {
  height: 60px;
  font-size: 1.5rem;
  width: 50%;
}
</style>
