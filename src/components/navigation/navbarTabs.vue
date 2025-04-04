<template>
  <div class="nav-bar__tabs">
    <NavBarTab path="/profile" label="Profile" />
    <NavBarTab path="/public" label="Public" />
    <template v-if="isAuthenticated">
      <NavBarTab path="/protected" label="Protected" />
      <NavBarTab path="/admin" label="Admin" />
    </template>
  </div>
</template>

<script setup lang="ts">
import NavBarTab from '@/components/navigation/desktop/navbarTab.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated } = useAuth0()
</script>
