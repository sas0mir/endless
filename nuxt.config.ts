import { db } from './server/utils/db';
import { users } from './server/db/schema';
import bcrypt from 'bcrypt';

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
      customElement: false
    },
    vueJsx: {
      mergeProps: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/_variables.scss" as *;
                            @use "@/assets/styles/_mixins.scss" as *;`
        }
      }
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
    globalAppMiddleware: false,
    enableGlobalAppMiddleware: true,
    provider: {
      credentials: {
        authorize: async (credentials) => {
          const user = await db.query.users.findFirst({
            where: (user, { eq }) => eq(user.email, credentials.email)
          });
          if (!user) return null;
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;

          return {id: user.id, email: user.email, name: user.name || 'User'};
        }
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },
  components: true,
  css: [
    '@/assets/styles/main.css'
  ],
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
