<template>
  <div :class="styles.login_container">
    <AnimatedBackOne xtra-class="login_background"/>
    <form :class="styles.login_form" @submit.prevent="handleSubmit">
      <Einput v-model="email" placeholder="username or email" />
      <Einput v-model="password" placeholder="password" type="password" />
      <button type="submit">Enter</button>
    </form>
    <hr />
    <p :class="styles.error" v-if="error">{{ error }}</p>
    <button @click="googleLogin">Sign in with Google</button>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackOne from '../components/AnimatedBackOne.client.vue';
import Einput from '../components/Einput.vue';
import { ref, useCssModule } from 'vue';

const styles = useCssModule();
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

<style lang="scss" module>

.login_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;


  .login_form {
    display: flex;
    flex-direction: column;
    max-height: 30vh;
    max-width: 30vw;
    padding: 2rem;
    background: rgba($s-background, 0.19);
    border-radius: 1rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.8px);
    -webkit-backdrop-filter: blur(6.8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>
