<template>
  <div class="login_container">
    <AnimatedBackOne xtra-class="login_background"/>
    <form class="login_form" @submit.prevent="handleSubmit">
      <input v-model="email" placeholder="username or email" />
      <input v-model="password" placeholder="password" />
      <button type="submit">Enter</button>
    </form>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <button @click="googleLogin">Sign in with Google</button>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackOne from '../components/AnimatedBackOne.client.vue';
import { ref } from 'vue';
const { signIn } = useAuth();

const email = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async (formData: FormData) => {
  const result = await signIn('credentials', {
    email: email.value,
    password: password.value,
    redirect: false,
  })

  if (result?.error) {
    error.value = result.error;
  } else {
    error.value = '';
    navigateTo('/');
  }
}

const googleLogin = async () => {
  const result = await signIn('google', { redirect: false });

  if (result?.error) {
    error.value = result.error;
  } else {
    error.value = '';
    navigateTo('/');
  }
}
</script>
