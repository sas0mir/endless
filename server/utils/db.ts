import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fs from 'fs';
import * as schema from '../db/schema';

const sslPath = process.env.SSL_CERT_PATH || '/app/certs/root.crt';
console.log('000->', sslPath, process.env.SSL_CERT_PATH);
if (!sslPath || !fs.existsSync(sslPath)) {
  throw new Error(`SSL certificate not found at ${sslPath}`);
}

const sslCert = fs.readFileSync(sslPath, 'utf-8');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca: sslCert.toString(),
    rejectUnauthorized: false,
  }
});

export const db = drizzle(pool, { schema });
