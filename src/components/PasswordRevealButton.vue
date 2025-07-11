<template>
  <BButton
    variant="link"
    :class="['viewBtn', isValid ? 'valid-btn' : 'invalid-btn']"
    @click="toggle"
    :aria-label="isShown ? 'Hide password' : 'Show password'"
  >
    <font-awesome-icon :icon="['fas', isShown ? 'eye-slash' : 'eye']" />
  </BButton>
</template>

<script setup>
import { BButton } from "bootstrap-vue-next";
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  isValid: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const isShown = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    isShown.value = val;
  }
);

function toggle() {
  isShown.value = !isShown.value;
  emit("update:modelValue", isShown.value);
}
</script>

<style scoped>
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
  padding-top: 31px;
  padding-bottom: 0;
}

.invalid-btn {
  padding-bottom: 15px;
  padding-top: 0;
}
</style>
