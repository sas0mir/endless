<template>
  <button class="button__login" @click="handleLogin">Log In</button>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()

const handleLogin = () => {
  loginWithRedirect({
    appState: {
      target: '/profile',
    },
    authorizationParams: {
      prompt: 'login',
    },
  })
}
</script>
