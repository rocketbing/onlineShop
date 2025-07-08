<template>
  <!-- Select -->
  <label :for="inputAttrs.model">{{ inputAttrs.placeholder }}:</label>
  <select
    v-if="inputAttrs.type === 'select'"
    type="select"
    class="form-select"
    :name="inputAttrs.model"
    :id="inputAttrs.model"
    :value="modelValue"
    :required="inputAttrs.required"
    @change="handleChange($event)"
  >
    <option disabled value="">-- Select --</option>
    <option v-for="item in inputAttrs.options" :key="item" :value="item">
      {{ item }}
    </option>
  </select>

  <!-- Radio -->
  <div
    v-else-if="inputAttrs.type === 'radio'"
    class="form-check"
    v-for="radioItem in inputAttrs.options"
    :key="radioItem"
  >
    <input
      type="radio"
      class="form-check-input"
      :name="inputAttrs.model"
      :id="radioItem"
      :required="inputAttrs.required"
      :value="radioItem"
      @change="handleChange($event)"
      :checked="modelValue === radioItem"
    />
    <label class="form-check-label" :for="radioItem">{{ radioItem }}</label>
  </div>

  <!-- Checkbox -->
  <div
    v-else-if="inputAttrs.type === 'checkbox'"
    class="form-check"
    v-for="checkboxItem in inputAttrs.options"
    :key="checkboxItem"
  >
    <input
      type="checkbox"
      class="form-check-input"
      :name="inputAttrs.model"
      :id="checkboxItem"
      :required="inputAttrs.required"
      :value="checkboxItem"
      @change="handleChange($event, 'checkbox', checkboxItem)"
      :checked="modelValue.includes(checkboxItem)"
    />
    <label :for="checkboxItem">{{ checkboxItem }}</label>
  </div>
  <!-- Textarea -->
  <textarea
    v-else-if="inputAttrs.type === 'textarea'"
    type="textarea"
    class="form-control"
    :name="inputAttrs.model"
    :id="inputAttrs.model"
    :cols="inputAttrs.cols"
    :rows="inputAttrs.rows"
    :required="inputAttrs.required"
    :value="modelValue"
    @input="handleChange($event)"
  >
  </textarea>
  <!-- Date -->
  <input
    v-else-if="inputAttrs.type === 'date'"
    type="date"
    :id="inputAttrs.model"
    :name="inputAttrs.model"
    :min="inputAttrs.startDate"
    :max="inputAttrs.endDate"
    :required="inputAttrs.required"
    :value="modelValue"
    @change="handleChange($event)"
  />

  <!-- number -->
  <input
    v-else-if="inputAttrs.type === 'number'"
    type="number"
    :id="inputAttrs.model"
    :name="inputAttrs.model"
    :min="inputAttrs.minimum"
    :max="inputAttrs.maximum"
    :required="inputAttrs.required"
    :value="modelValue"
    @change="handleChange($event)"
  />
  <!-- Input -->
  <input
    v-else
    :type="inputAttrs.type"
    :id="inputAttrs.model"
    :name="inputAttrs.model"
    :pattern="inputAttrs.pattern"
    :placeholder="inputAttrs.placeholder"
    :required="inputAttrs.required"
    :value="modelValue"
    @input="handleChange($event)"
    :class="inputAttrs.class || 'form-control mb-3'"
  />
</template>

<script setup>
import { computed } from "vue";

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

const handleChange = (event, type, checkboxItem) => {
  if (type === "checkbox") {
    const checked = event.target.checked;
    let updatedValue;

    if (Array.isArray(props.modelValue)) {
      updatedValue = checked
        ? [...props.modelValue, checkboxItem]
        : props.modelValue.filter((item) => item !== checkboxItem);
    } else {
      updatedValue = checked ? [checkboxItem] : [];
    }

    emit("update:modelValue", updatedValue);
  } else {
    emit("update:modelValue", event.target.value);
  }
};
</script>
<style scoped></style>
