<template>
  <div>
    <input
      type="text"
      v-model="password"
      placeholder="Please enter your password"
      @input="v$.password.$touch()"
      style="display: block; width: 100%"
    />
    <span v-if="v$.password.$invalid">{{ errorMessage.password }}</span>
    <input
      type="password"
      v-model="confirmPassword"
      placeholder="Please confirm your password"
      style="display: block; width: 100%"
    />
    <span v-if="v$.confirmPassword.$invalid">{{
      errorMessage.confirmPassword
    }}</span>
  </div>
</template>
<script setup lang="js">
import { reactive, ref, computed} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs,minLength } from '@vuelidate/validators'
let password = ref('')
let confirmPassword = ref('')
const passwordValue = computed(() => password.value)
const rules = {
  password: {
    required,
    minLength: minLength(5)
  },
  confirmPassword: {
    required,
    sameAs: sameAs(passwordValue),
  },
};
const errorMessage = {
  password: 'Password less than 5',
  confirmPassword: 'Password doesn\'t matched!'
}

const v$ = useVuelidate(rules, {password,confirmPassword});
console.log(v$)
</script>
<style scoped></style>
