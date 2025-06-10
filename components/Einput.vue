<template>
  <div :class="styles.input_container">
    <input
      v-model="modelValue"
      :placeholder="placeholder"
      :type="type"
      :class="styles.input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" :class="styles.error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, useCssModule } from 'vue';

defineProps({
  // modelValue: {
  //   type: String,
  //   default: ''
  // },
  placeholder: {
    type: String,
    default: 'Enter text'
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  }
});

const styles = useCssModule();

</script>

<style lang="scss" module>

.input_container {
  position: relative;
  display: flex;

  .input {
    width: 100%;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
}


</style>
