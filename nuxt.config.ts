export default defineNuxtConfig({
  compatibilityDate: '2025-04-22',
  devtools: { enabled: false },
  ssr: true,
  routeRules: {
    '/': { prerender: true },
    '/api/*': { cache: { maxAge: 60 * 60 }}
  },
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
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authSecret: process.env.AUTH_SECRET,
    public: {
      apiBase: '/api',
      authJsUrl: 'http://localhost:3000',
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
  auth: {
    idEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    origin: 'http://localhost:3000',
    basePath: '/api/auth',
    defaultProvider: 'credentials',
    baseURL: 'http://localhost:3000/api/auth',
    globalAppMiddleware: true,
    enableGlobalAppMiddleware: true,
    provider: {
      credentials: {
        authorize: async (credentials) => {
          const { email, password } = credentials;
          return {email, password}
        }
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
      // type: 'local',
      // token: {
      //   signInResponseTokenPointer: '/token',
      //   type: 'Bearer',
      //   cookieName: 'auth.token',
      //   headerName: 'Authorization',
      //   maxAgeSeconds: 1800, // 30 minutes
      //   sameSiteAttribute: 'lax',
      //   cookieDomain: 'sidebase.io',
      //   secureCookieAttribute: false,
      //   httpOnlyCookieAttribute: false,
      // },
      // refresh: {
      //   isEnabled: true,
      //   endpoint: { path: '/refresh', method: 'post' },
      //   refreshOnlyToken: true,
      //   token: {
      //     signInResponseRefreshTokenPointer: '/refresh-token',
      //     refreshResponseTokenPointer: '',
      //     refreshRequestTokenPointer: '/refresh-token',
      //     cookieName: 'auth.token',
      //     maxAgeSeconds: 129600, // 18 hours
      //     sameSiteAttribute: 'lax',
      //     secureCookieAttribute: false,
      //     cookieDomain: 'sidebase.io',
      //     httpOnlyCookieAttribute: false,
      //   }
      // },
      // pages: {
      //   login: '/login',
      // },
      // endpoints: {
      //   singIn: {path: '/login', method: 'post'},
      //   signOut: {path: '/logout', method: 'post'},
      //   signUp: {path: '/register', method: 'post'},
      //   getSession: {path: '/session', method: 'get'}
      // }
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
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
    ],
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
  ],
})
