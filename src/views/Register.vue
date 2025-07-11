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
              :state="
                item.model === 'email' || item.model === 'confirmPassword'
                  ? !v$[item.model].$invalid
                  : !v$[item.model].complexity.$invalid
              "
              class="mb-3"
            />

            <!-- Password validation -->
            <div v-if="item.model == 'password'">
              <PasswordRevealButton
                v-model="isShow"
                :isValid="!v$.password.complexity.$invalid"
              />

              <BProgress
                :value="passwordStrength"
                :max="100"
                height="1.5rem"
                class="mb-3"
              >
                <BProgressBar
                  :variant="strengthVariant"
                  :value="passwordStrength"
                  :label="`${passwordStrength}%`"
                />
              </BProgress>
            </div>

            <!-- Validation message -->
            <BFormInvalidFeedback
              v-if="v$[item.model].complexity"
              :state="!v$[item.model].complexity.$invalid"
            >
              {{ v$[item.model].complexity.$message }}
            </BFormInvalidFeedback>
            <BFormInvalidFeedback
              v-if="item.model === 'email'"
              :state="!v$[item.model].$invalid"
            >
              Please enter valid email
            </BFormInvalidFeedback>
            <BFormInvalidFeedback
              v-if="item.model === 'confirmPassword'"
              :state="!v$[item.model].$invalid"
            >
              Password doesn't matched!
            </BFormInvalidFeedback>
          </div>
        </BFormGroup>
      </template>

      <!-- Submit -->
      <BButton
        type="submit"
        variant="primary"
        size="lg"
        class="mt-3 submit-btn"
      >
        CREATE
      </BButton>
    </BForm>
  </BContainer>
</template>

<script setup>
import CustomInput from "@/components/CustomInput.vue";
import PasswordRevealButton from "@/components/PasswordRevealButton.vue";
import { reactive, ref, computed, watchEffect } from "vue";
import {
  BContainer,
  BForm,
  BButton,
  BFormGroup,
  BProgress,
  BProgressBar,
  BFormInvalidFeedback,
} from "bootstrap-vue-next";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, minLength, email } from "@vuelidate/validators";

// 表单数据
const registForm = reactive({
  fname: "",
  lname: "",
  email: "",
  password: "",
  confirmPassword: "",
  city: "",
  gender: "",
  hobby: [],
  comment: "",
  time: "",
  count: "",
});

// 字段定义（用于动态渲染表单）
const formList = [
  { type: "text", model: "fname", placeholder: "First name" },
  { type: "text", model: "lname", placeholder: "Last name" },
  { type: "email", model: "email", placeholder: "Email" },
  { type: "password", model: "password", placeholder: "Enter your password" },
  {
    type: "password",
    model: "confirmPassword",
    placeholder: "Confirm your password",
  },
  {
    type: "select",
    model: "city",
    placeholder: "Choose your city",
    options: ["北京", "上海", "深圳", "南京"],
  },
  {
    type: "radio",
    model: "gender",
    placeholder: "Choose your gender",
    options: ["Male", "Female"],
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
    placeholder: "Leave your comments",
    rows: 4,
  },
  {
    type: "date",
    model: "time",
    placeholder: "Pick the date",
    startDate: "1990-01-01",
    endDate: "2050-01-01",
  },
  {
    type: "number",
    model: "count",
    placeholder: "Choose a number",
    min: 0,
    max: 200,
  },
];

// 密码绑定
const passwordValue = computed(() => registForm.password);

// 表单验证规则
const rules = {
  fname: {
    required,
    complexity: {
      $validator: (value) => /^[A-Za-z]+$/.test(value),
      $message: "Please enter a valid first name",
    },
  },
  lname: {
    required,
    complexity: {
      $validator: (value) => /^[A-Za-z]+$/.test(value),
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
    complexity: {
      $validator: (value) => {
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[^A-Za-z0-9]/.test(value);
        return hasUpper && hasLower && hasNumber && hasSpecial;
      },
      $message:
        "Password must contain uppercase, lowercase, number, and special character.",
    },
  },
  confirmPassword: {
    required,
    sameAs: sameAs(passwordValue),
    complexity: {
      $message: "Password doesn't matched!",
    },
  },
  city: {
    required,
    complexity: {
      $validator: (value) => value !== "",
      $message: "Please select your city",
    },
  },
  gender: {
    required,
    complexity: {
      $validator: (value) => value !== "",
      $message: "Please select your gender",
    },
  },
  hobby: {
    required,
    complexity: {
      $validator: (value) => value.length > 0,
      $message: "Please select at least one hobby",
    },
  },
  comment: {
    required,
    complexity: {
      $validator: (value) => value.trim() !== "",
      $message: "Please give us some comment!",
    },
  },
  time: {
    required,
    complexity: {
      $validator: (value) => value !== "",
      $message: "Please select the time",
    },
  },
  count: {
    required,
    complexity: {
      $validator: (value) => value !== "",
      $message: "Please select a number",
    },
  },
};

const v$ = useVuelidate(rules, registForm);

// 控制密码显示
const isShow = ref(false);

function showPassword() {
  isShow.value = !isShow.value;
}

// 计算密码强度
const passwordStrength = computed(() => {
  const rules = [
    { rule: /[0-9]+/, credit: 20 },
    { rule: /[A-Z]+/, credit: 20 },
    { rule: /[a-z]+/, credit: 20 },
    { rule: /[^A-Za-z0-9]/, credit: 20 },
  ];
  let strength = rules.reduce(
    (acc, { rule, credit }) =>
      rule.test(registForm.password) ? acc + credit : acc,
    0
  );
  if (registForm.password.length >= 12) strength += 20;
  return Math.min(strength, 100);
});

// 强度样式
const strengthVariant = computed(() => {
  if (passwordStrength.value < 40) return "danger";
  if (passwordStrength.value < 70) return "warning";
  return "success";
});

// 提交处理
function submitHandler() {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    console.log("Form submitted:", registForm);
    // 提交逻辑
  }
}
watchEffect(() => {
  console.log(v$.value);
});
</script>

<style scoped lang="scss">
.container {
  margin: 50px auto;
  padding-bottom: 50px;

  .viewBtn {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    color: #6c757d;
    font-size: 1.2rem;
    z-index: 10;
  }

  .valid-btn {
    padding-top: 0px;
    padding-bottom: 5px;
  }

  .invalid-btn {
    padding-bottom: 42px;
    padding-top: 0;
  }

  .submit-btn {
    height: 60px;
    font-size: 1.5rem;
    width: 50%;
  }
}
</style>
