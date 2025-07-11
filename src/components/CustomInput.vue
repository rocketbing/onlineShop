<template>
  <BFormGroup :label="inputAttrs.placeholder" :label-for="inputAttrs.model">
    <!-- Select -->
    <BFormSelect
      v-if="inputAttrs.type === 'select'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      :options="inputAttrs.options"
      :name="inputAttrs.model"
      :state="state"
    />

    <!-- Radio -->
    <BFormRadioGroup
      v-else-if="inputAttrs.type === 'radio'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      :options="inputAttrs.options"
      :name="inputAttrs.model"
      :state="state"
    />

    <!-- Checkbox -->
    <BFormCheckboxGroup
      v-else-if="inputAttrs.type === 'checkbox'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      :options="inputAttrs.options"
      :name="inputAttrs.model"
      :state="state"
    />

    <!-- Textarea -->
    <BFormTextarea
      v-else-if="inputAttrs.type === 'textarea'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      :rows="inputAttrs.rows || 3"
      :name="inputAttrs.model"
      :state="state"
    />

    <!-- Date -->
    <BFormInput
      v-else-if="inputAttrs.type === 'date'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      type="date"
      :min="inputAttrs.startDate"
      :max="inputAttrs.endDate"
      :name="inputAttrs.model"
      :state="state"
    />

    <!-- Number -->
    <BFormInput
      v-else-if="inputAttrs.type === 'number'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      type="number"
      :min="inputAttrs.min"
      :max="inputAttrs.max"
      :name="inputAttrs.model"
      :state="state"
    />

    <!-- Default Input -->
    <BFormInput
      v-else
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      :type="inputAttrs.type || 'text'"
      :name="inputAttrs.model"
      :state="state"
    />
  </BFormGroup>
</template>

<script setup>
import { computed } from "vue";
import {
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormSelect,
  BFormRadioGroup,
  BFormCheckboxGroup,
} from "bootstrap-vue-next";

const props = defineProps({
  inputAttrs: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: "",
  },
  state: {
    type: Boolean,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<style scoped>
.mb-2 {
  margin-bottom: 0.75rem;
}
</style>
