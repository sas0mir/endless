export default defineNuxtConfig({
  compatibilityDate: '2025-04-22',
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },
  runtimeConfig: {
    apiSecret: process.env.NUXT_PRIVATE_SECRET || '1234',
    public: {
      apiBase: '/api',
      cdnUrl: process.env.NUXT_PUBLIC_CDN_URL || ''
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    },
    vue: {
      customElement: true
    },
    vueJsx: {
      mergeProps: true
    }
  },
  components: true,
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils'
  ],
})
