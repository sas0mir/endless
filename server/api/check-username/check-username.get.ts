import { db } from '~/server/utils/db';
import { users } from '~/server/db/schema';

export default defineEventHandler(async (event) => {
  const username = getQuery(event).username as string;
  if (!username) {
    throw createError({ statusCode: 400, message: 'Username is required' });
  }
  // Check if username already exists
  const existingUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, username),
  });
  if (existingUser) {
    return { available: false, message: 'Username is already taken' };
  }
  return { available: true, message: 'Username is available' };
});
