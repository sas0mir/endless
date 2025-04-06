<template>
  <div class="nav-bar__buttons">
    <template v-if="!isAuthenticated">
      <SignupButton />
      <LoginButton />
    </template>
    <template v-if="isAuthenticated">
      <LogoutButton />
    </template>
  </div>
</template>

<script setup lang="ts">
import LoginButton from '@/components/buttons/loginButton.vue'
import LogoutButton from '../buttons/logoutButton.vue'
import SignupButton from '../buttons/signupButton.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated } = useAuth0()
</script>
