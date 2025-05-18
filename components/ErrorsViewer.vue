<template>
  <div class="errorsviewer_wrapper">
    <NuxtErrorBoundary @error="onError">
      <slot />
      <template #error="{ error }">
        <div class="error_message">
          <p>Something went wrong:</p>
          <p>{{ error.message }}</p>
          <p v-if="error.stack">{{ error.stack }}</p>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
//import { showError } from '#app';

const props = defineProps<{
  error: NuxtError
}>();

const onError = (error: unknown) => {
  if (error && typeof error === 'object' && 'message' in error) {
    console.error('An error occurred:', (error as { message: string }).message);
  } else {
    console.error('An unknown error occurred:', error);
  }
};
</script>
