<template>
  <BContainer
    class="d-flex flex-column align-items-start pt-3"
    style="max-width: 640px"
  >
    <h1 class="pb-2 mb-5">Create Account</h1>
    <BForm class="w-100" @submit.prevent="submitHandler">
      <!-- Dynamic form fields -->
      <CustomInput
        v-for="(item, index) in formList"
        :key="index"
        :inputAttrs="item"
        v-model="registForm[item.model]"
        class="mb-3"
      />

      <!-- Password field -->
      <BFormGroup class="position-relative mb-3">
        <CustomInput
          :inputAttrs="{
            type: isShow ? 'text' : 'password',
            model: 'password',
            placeholder: 'Enter Password',
            required: true,
          }"
          v-model="registForm.password"
          :state="!v$.password.complexity.$invalid"
        />
        <BButton
          variant="link"
          :class="[
            'viewBtn',
            // Determine the style of the eyes icon
            !v$.password.complexity.$invalid ? 'valid-btn' : 'invalid-btn',
          ]"
          @click="showPassword"
          :aria-label="isShow ? 'Hide password' : 'Show password'"
        >
          <font-awesome-icon :icon="['fas', isShow ? 'eye-slash' : 'eye']" />
        </BButton>
        <!-- password validation -->
        <BFormInvalidFeedback :state="!v$.password.complexity.$invalid">
          Your password should contain at least one Uppercase, one Lowercase,
          one number and one special character.
        </BFormInvalidFeedback>
        <BFormValidFeedback :state="!v$.password.complexity.$invalid">
          Looks Good.
        </BFormValidFeedback>
      </BFormGroup>
      <BFormGroup class="position-relative mb-3">
        <CustomInput
          :inputAttrs="{
            type: isShow ? 'text' : 'password',
            model: 'confirmPassword',
            placeholder: 'Please Confirm Password',
            required: true,
          }"
          v-model="registForm.confirmPassword"
          @input="v$.confirmPassword.$touch()"
        />
        <!-- password confirmation validation -->
        <BFormInvalidFeedback :state="!v$.password.complexity.$invalid">
          Your password should contain at least one Uppercase, one Lowercase,
          one number and one special character.
        </BFormInvalidFeedback>
        <BFormValidFeedback :state="!v$.password.complexity.$invalid">
          Looks Good.
        </BFormValidFeedback>
      </BFormGroup>

      <!-- Password strength indicator -->
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

      <!-- Submit button -->
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
import { reactive, ref, computed } from "vue";
import {
  BContainer,
  BForm,
  BButton,
  BFormGroup,
  BProgress,
  BProgressBar,
  BFormInvalidFeedback,
  BFormValidFeedback,
} from "bootstrap-vue-next";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, minLength } from "@vuelidate/validators";
import { watchEffect } from "vue";

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
    required: true,
  },
  {
    type: "textarea",
    model: "comment",
    placeholder: "Leave your comments",
    rows: 4,
    required: true,
  },
  {
    type: "date",
    model: "time",
    placeholder: "Pick the date",
    startDate: "1990-01-01",
    endDate: "2050-01-01",
    required: true,
  },
  {
    type: "number",
    model: "count",
    placeholder: "Choose a number",
    min: 0,
    max: 200,
    required: true,
  },
];
const passwordValue = computed(() => registForm.password);
const rules = {
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
    },
    confirmPassword: {
      required,
      sameAs: sameAs(passwordValue),
    },
  },
};

const v$ = useVuelidate(rules, registForm);
const isPasswordValid = computed(
  () =>
    v$.value.password.complexity.$dirty &&
    !v$.value.password.complexity.$invalid
);
const isShow = ref(false);
watchEffect(() => {
  console.log(v$.value.password);
});

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

const strengthVariant = computed(() => {
  if (passwordStrength.value < 40) return "danger";
  if (passwordStrength.value < 70) return "warning";
  return "success";
});

function showPassword() {
  isShow.value = !isShow.value;
}

function submitHandler() {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    console.log("Form submitted:", registForm);
    // 这里添加实际提交逻辑
  }
  console.log(v$.value.$invalid);
}
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
    padding-top: 5px;
    padding-bottom: 0;
  }

  .invalid-btn {
    padding-bottom: 15px;
    padding-top: 0;
  }

  .submit-btn {
    height: 60px;
    font-size: 1.5rem;
    width: 50%;
  }

  :deep(.form-control) {
    padding: 1rem 1.5rem;
    height: 50px;
  }
}
</style>
