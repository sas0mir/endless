import { db } from '~/server/utils/db';
import { users } from '~/server/db/schema';

export default defineEventHandler(async () => {
  const allUsers = await db.select().from(users);
  return allUsers;
})
