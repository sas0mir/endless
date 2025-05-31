import { db } from '~/server/utils/db';
import { users } from '~/server/db/schema';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  if (existingUser) {
    throw createError({ statusCode: 400, message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into the database
  await db.insert(users).values({
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).execute();

  return { success: true, message: 'User registered successfully' };
});
