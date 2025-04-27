import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import sql from '~/server/utils/db';
import PostgresJSAdapter from '~/server/utils/PostgresJSAdapter';

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: runtimeConfig.AUTH_SECRET,
  adapter: PostgresJSAdapter(sql),
  providers: [
    GithubProvider.default({
      clientId: runtimeConfig.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
    })
  ]
})
