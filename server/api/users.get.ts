import { db } from '~/server/db';
import { users } from '~/server/db/schema';

export default defineEventHandler(async () => {
  const result = await db.select().from(users);
  return result;
});
