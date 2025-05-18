import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('ERROR-HANDLER->', error, '\n->', instance, '\n->', info);
  }

  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error('VUE-ERROR->', error, '\n->', instance, '\n->', info);
  })
})
