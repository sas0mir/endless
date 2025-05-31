export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  if (status.value === 'unauthenticated' && to.path !== '/login') {
    return navigateTo('/login');
  }
})
