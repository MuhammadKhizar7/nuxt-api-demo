import { useValidatedBody, z } from 'h3-zod'

export default eventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string().min(1).max(100)
  })
  const { title } = body
  const { user } = await requireUserSession(event)

  // Insert todo for the current user
  const todo = await useDb().insert(tables.todos).values({
    userId:user.id,
    title,
  }).returning().get()

  return todo
})