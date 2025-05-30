export default defineNuxtRouteMiddleware((to, from) => {
  const {
    status,
    data,
    lastRefreshed,
    getCsrfToken,
    getProviders,
    getSession,
    signIn,
    signOut,
  } = useAuth();

  if (status.value === 'unauthenticated') {
    // Redirect to login page if not authenticated
    return navigateTo('/login');
  }
})
