import { eq } from 'drizzle-orm';
import { z } from 'zod'

interface DBUser {
  id: number
  email: string
  password: string
}

const invalidCredentialsError = createError({
  statusCode: 401,
  // This message is intentionally vague to prevent user enumeration attacks.
  message: 'Invalid credentials',
})

export default defineEventHandler(async (event) => {
  const db = useDb()

  const { email, password } = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }).parse)
    
    const user = await db.select().from(tables.users).where(eq(tables.users.email, email)).get()

  if (!user) {
    throw invalidCredentialsError
  }

  if (!(await verifyPassword(user.password, password))) {
    throw invalidCredentialsError
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      email,
    },
    loggedInAt: Date.now(),
  })
  console.log('User logged in:', email)
  return setResponseStatus(event, 200)
})