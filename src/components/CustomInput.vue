<template>
  <BFormGroup :label="inputAttrs.placeholder" :label-for="inputAttrs.model">
    <!-- Select -->
    <BFormSelect
      v-if="inputAttrs.type === 'select'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      :options="inputAttrs.options"
      :required="inputAttrs.required"
      class="mb-2"
    />

    <!-- Radio -->
    <BFormRadioGroup
      v-else-if="inputAttrs.type === 'radio'"
      v-model="modelValueProxy"
      :options="inputAttrs.options"
      :name="inputAttrs.model"
      :required="inputAttrs.required"
      class="mb-2"
    />

    <!-- Checkbox -->
    <BFormCheckboxGroup
      v-else-if="inputAttrs.type === 'checkbox'"
      v-model="modelValueProxy"
      :options="inputAttrs.options"
      :name="inputAttrs.model"
      class="mb-2"
    />

    <!-- Textarea -->
    <BFormTextarea
      v-else-if="inputAttrs.type === 'textarea'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      :rows="inputAttrs.rows || 3"
      :required="inputAttrs.required"
      class="mb-2"
    />

    <!-- Date (use BFormInput with type='date') -->
    <BFormInput
      v-else-if="inputAttrs.type === 'date'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      type="date"
      :min="inputAttrs.startDate"
      :max="inputAttrs.endDate"
      :required="inputAttrs.required"
      class="mb-2"
    />

    <!-- Number -->
    <BFormInput
      v-else-if="inputAttrs.type === 'number'"
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      type="number"
      :min="inputAttrs.min"
      :max="inputAttrs.max"
      :required="inputAttrs.required"
      class="mb-2"
    />

    <!-- Default Input -->
    <BFormInput
      v-else
      :id="inputAttrs.model"
      v-model="modelValueProxy"
      :type="inputAttrs.type || 'text'"
      :pattern="inputAttrs.pattern"
      :required="inputAttrs.required"
      class="mb-2"
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
