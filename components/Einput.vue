<script setup lang="ts">
import { computed, ref, watch } from 'vue'
const styles = useCssModule();

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  rules: {
    type: Array as () => Array<(val: string) => string | true>,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const internalValue = ref(props.modelValue)
const errorMessage = ref<string | null>(null)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

function validate(): boolean {
  errorMessage.value = null

  if (props.required && !internalValue.value) {
    errorMessage.value = 'Поле обязательно'
    return false
  }

  for (const rule of props.rules) {
    const result = rule(internalValue.value)
    if (result !== true) {
      errorMessage.value = result
      return false
    }
  }

  return true
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  internalValue.value = target.value
  emit('update:modelValue', internalValue.value)
}

function onBlur() {
  validate()
  emit('blur')
}

defineExpose({ validate }) // если хочешь валидировать вручную снаружи
</script>

<template>
  <div :class="styles.input_container">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :value="internalValue"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
    />
    <p v-if="errorMessage" :class="styles.error">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" module>
// @use 'assets/styles/variables' as *;
.input_container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;

  input {
    padding: 1rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid $s-input-border;
    color: $s-text-primary;

    &:focus {
      outline: none;
      border-color: $s-input-focus;
    }
    &::placeholder {
      color: $s-text-success;
    }
  }
  .error {
    position: absolute;
    bottom: -1rem;
    left: 0;
    color: $s-text-error;
    font-size: 1rem;
  }
}
</style>
