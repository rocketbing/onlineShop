<template>
  <BFormGroup :label="inputAttrs.placeholder" :label-for="inputAttrs.model">
    <!-- 普通输入框和控件 -->
    <template v-if="inputAttrs.type !== 'password'">
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

      <!-- Default Text -->
      <BFormInput
        v-else
        :id="inputAttrs.model"
        v-model="modelValueProxy"
        :type="inputAttrs.type || 'text'"
        :name="inputAttrs.model"
        :state="state"
      />
    </template>

    <!-- 密码字段 -->
    <template v-else>
      <div class="position-relative">
        <BFormInput
          :id="inputAttrs.model"
          v-model="modelValueProxy"
          :type="isShown ? 'text' : 'password'"
          :name="inputAttrs.model"
          :state="state"
        />
        <BButton variant="link" class="viewBtn" @click="toggleShow">
          <font-awesome-icon :icon="['fas', isShown ? 'eye-slash' : 'eye']" />
        </BButton>
      </div>

      <!-- 强度条 -->
      <BProgress
        v-if="inputAttrs.model === 'password'"
        :value="passwordStrength"
        :max="100"
        height="1.5rem"
        class="mt-1"
      >
        <BProgressBar
          :variant="strengthVariant"
          :value="passwordStrength"
          :label="`${passwordStrength}%`"
        />
      </BProgress>
    </template>
  </BFormGroup>
</template>

<script setup>
import {
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormSelect,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BButton,
  BProgress,
  BProgressBar,
} from "bootstrap-vue-next";
import { computed, ref } from "vue";

// Props
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

// Emits
const emit = defineEmits(["update:modelValue"]);

// Proxy binding
const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// 控制密码显示
const isShown = ref(false);
const toggleShow = () => (isShown.value = !isShown.value);

// 密码强度计算（仅密码字段时生效）
const passwordStrength = computed(() => {
  const val = props.modelValue;
  const rules = [
    { rule: /[0-9]+/, credit: 20 },
    { rule: /[A-Z]+/, credit: 20 },
    { rule: /[a-z]+/, credit: 20 },
    { rule: /[^A-Za-z0-9]/, credit: 20 },
  ];
  let score = rules.reduce(
    (acc, { rule, credit }) => (rule.test(val) ? acc + credit : acc),
    0
  );
  if (val?.length >= 12) score += 20;
  return Math.min(score, 100);
});

// 强度颜色
const strengthVariant = computed(() => {
  const val = passwordStrength.value;
  if (val < 40) return "danger";
  if (val < 70) return "warning";
  return "success";
});
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
</style>
