import { PgColumn } from "drizzle-orm/pg-core";
import getDb from "~/server/db";

// ???? const { auth } = useAuth();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // const { email, password } = body;

  // // Validate the input
  // if (!email || !password) {
  //   return sendError(event, createError({ statusCode: 400, statusMessage: 'Email and password are required' }));
  // }

  // // Check if the user exists in the database
  // const db = await getDb();
  // const user = await db.query.users.findFirst({
  //   where: (users) => eq(users.email, email),
  // });

  // if (!user) {
  //   return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid email or password' }));
  // }

  // // Check if the password is correct
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid email or password' }));
  // }

  // // Generate a JWT token
  // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // // Send the token back to the client
  // return { token };
  await auth.attempt(event, body.email, body.password)
})

