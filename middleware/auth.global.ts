export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  if (['/login', '/register'].includes(to.path)) return

  if (status.value === 'unauthenticated' && to.path !== '/login') {
    return navigateTo('/login');
  }
})
