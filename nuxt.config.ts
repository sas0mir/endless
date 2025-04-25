export default defineNuxtConfig({
  compatibilityDate: '2025-04-22',
  devtools: { enabled: false },
  ssr: true,
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      title: 'Aurora engine',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
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
    port: 3000
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
    '@nuxt/test-utils',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Poiret One': {
            wght: [400],
          },
          'Fascinate': {
            whgt: [400],
          }
        }
      }
    ]
  ],
})
