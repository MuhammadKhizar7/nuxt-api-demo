export default eventHandler(async (event) => {
//   const { user } = await requireUserSession(event)

  // List todos for the current user
  const todos = await useDb().select().from(tables.todos).all() //.from(tables.todos).where(eq(tables.todos.userId, user.id)).all()

  return todos as Todo[]
})

