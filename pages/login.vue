<template>
  <div class="login_container">
    <AnimatedBackOne xtra-class="login_background"/>
    <form class="login_form" :submit="handleSubmit">
      <input type="text" placeholder="username" name="username" />
      <input type="text" placeholder="password" name="password" />
      <button type="submit">Enter</button>
    </form>
    <div class="login_oauth_form">
      <button v-if="data?.user" @click="() => signOut()">Sign Out</button>
      <button v-else @click="() => signIn('github')">Sign In</button>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackOne from '~/components/AnimatedBackOne.vue';

const { data, signIn, signOut } = udeAuth();

function handleSubmit(formData: FormData) {
  navigateTo('/dashboard')
}
</script>
