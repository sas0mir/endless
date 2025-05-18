import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig ({
  schema: './server/db/schema.ts',
  out: './drizzle',
  driver: 'd1-http',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})

//make migration npx drizzle-kit generate
//migrate npx drizzle-kit push
