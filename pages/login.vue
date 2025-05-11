<template>
  <div class="login_container">
    <AnimatedBackOne xtra-class="login_background"/>
    <form class="login_form" :submit="handleSubmit">
      <input type="text" placeholder="username" name="username" />
      <input type="text" placeholder="password" name="password" />
      <button type="submit">Enter</button>
    </form>
    <div class="login_oauth_form">
      <button @click="signIn('google')">Sign in with Google</button>
      <button @click="signOut()">Sign out</button>
      <pre v-if="session.status === 'authentificated'">
        Hello there {{ session.data?.user?.name }}!
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackOne from '~/components/AnimatedBackOne.vue';
import { signIn, signOut, useSession } from '#auth';

const session = useSession();
function handleSubmit(formData: FormData) {
  navigateTo('/dashboard')
}
</script>
