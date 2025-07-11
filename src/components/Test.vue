<template>
  <div>
    <input
      type="email"
      v-model="form.email"
      placeholder="Please enter your email"
      @input="v$.email.$touch()"
      style="display: block; width: 100%"
    />

    <BFormInvalidFeedback>
      {{ v$.email.required.$errors[0].$message }}
    </BFormInvalidFeedback>

    <BFormInvalidFeedback v-if="v$.email.$dirty && v$.email.email.$invalid">
      {{ v$.email.email.$message }}
    </BFormInvalidFeedback>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const form = reactive({
  email: "",
});

const rules = {
  email: {
    required: {
      $validator: required,
      $message: "Email is required",
    },
    email: {
      $validator: email,
      $message: "Email format is invalid",
    },
  },
};

const v$ = useVuelidate(rules, form);
watchEffect(() => {
  console.log(v$.value.email.required.$errors);
});
</script>
