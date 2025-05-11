import GoogleProvider from 'next-auth/providers/google';
import type { AuthConfig } from '@sidebase/nuxt-auth';

export default <AuthConfig>{
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login'
  }
}
