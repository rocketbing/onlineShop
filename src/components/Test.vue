<script setup>
import { reactive, watchEffect } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, withMessage } from "@vuelidate/validators";

const form = reactive({
  email: "",
});

const rules = {
  email: {
    required: withMessage("Email is required", required),
  },
};

const v$ = useVuelidate(rules, form);

watchEffect(() => {
  console.log(v$.value.email.required.$message); // 正常应该输出 message
});
</script>
