import getDb from '../db';
import { users } from '../db/schema';

export default defineEventHandler(async () => {
  const db = await getDb();
  const result = await db.select().from(users);
  return result;
});
