import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fs from 'fs';
import * as schema from '../db/schema';

const sslCert = fs.readFileSync('../certs/root.crt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca: sslCert.toString(),
    rejectUnauthorized: true,
  }
});

export const db = drizzle(pool, { schema });
