<script setup lang="ts">

const { data, status, signOut } = useAuth()
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <img :src="data.avatar" alt="Logo" class="logo" />
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
          <li><NuxtLink to="/logout">Logout</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
