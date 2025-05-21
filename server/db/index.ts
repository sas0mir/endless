import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';


export default async function getDb() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
    await pool.connect();
    const db = drizzle(pool, { schema });
    console.log('Connected to the database');
    return db;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }

}
