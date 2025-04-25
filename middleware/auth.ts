export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthentificated = false; //todo session
  if (!isAuthentificated) {
    return navigateTo('/login')
  }
})
