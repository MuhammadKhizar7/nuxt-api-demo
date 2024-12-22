import { useValidatedBody, z } from 'h3-zod'

export default eventHandler(async (event) => {
  const { title } = await useValidatedBody(event, {
    title: z.string().min(1).max(100)
  })
  // const { user } = await requireUserSession(event)

  // Insert todo for the current user
  const todo = await useDb().insert(tables.todos).values({
    userId: 1, //user.id,
    title,
  }).returning().get()

  return todo
})