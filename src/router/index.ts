import { createRouter, createWebHistory } from 'vue-router'
import CallbackPage from '@/pages/CallbackPage.vue'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: CallbackPage,
    },
  ],
})

export default router
