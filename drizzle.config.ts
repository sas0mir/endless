import type { Config } from 'drizzle-kit';

export default {
  schema: './server/db/schema.ts',
  out: './drizzle',
  driver: 'd1-http',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;

//make migration npx drizzle-kit generate
//migrate npx drizzle-kit push
