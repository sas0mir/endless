<template>
  <div class="login_container">
    <AnimatedBackOne xtra-class="login_background"/>
    <form class="login_form" :submit="handleSubmit">
      <input type="text" placeholder="username" name="username" />
      <input type="text" placeholder="password" name="password" />
      <button type="submit">Enter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackOne from '~/components/AnimatedBackOne.vue';

function handleSubmit(formData: FormData) {
  navigateTo('/dashboard')
}
</script>
