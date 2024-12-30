<script setup>
definePageMeta({
  middleware: 'auth'
})
const newTodo = ref('')
const todos = ref([])

async function addTodo(todo) {
  const data = await $fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title: todo, completed: 0 })
  })
  todos.value.push(data)
  newTodo.value = ''
}

async function toggleTodo(todo) {
  const data = await $fetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed: todo.completed ? 0 : 1 })
  })
  todo.completed = data.completed
}

async function deleteTodo(todo) {
  const data = await $fetch(`/api/todos/${todo.id}`, {
    method: 'DELETE'
  })
  todos.value = todos.value.filter(t => t.id !== todo.id)
}

onMounted(async () => {
  const data = await $fetch('/api/todos')
  console.log(data)
  todos.value = data
})
          
</script>
<template>
   <form
    class="flex flex-col gap-4"
    @submit.prevent="addTodo(newTodo)"
  >
    <div class="flex items-center gap-2">
      <UInput
        v-model="newTodo"
        name="todo"
        class="flex-1"
        placeholder="Make a Nuxt demo"
        autocomplete="off"
        autofocus
        :ui="{ wrapper: 'flex-1' }"
      />

      <UButton
        type="submit"
        icon="i-heroicons-plus-20-solid"
        :disabled="newTodo.trim().length === 0"
      />
    </div>

    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li
        v-for="todo of todos"
        :key="todo.id"
        class="flex items-center gap-4 py-2"
      >
        <span
          class="flex-1 font-medium"
          :class="{
            'text-gray-500': todo.completed || todo.id < 0,
            'line-through': todo.completed
          }"
        >{{ todo.title }}</span>

        <UToggle
          :model-value="Boolean(todo.completed)"
          :disabled="todo.id < 0"
          @update:model-value="toggleTodo(todo)"
        />

        <UButton
          color="red"
          variant="soft"
          size="2xs"
          icon="i-heroicons-x-mark-20-solid"
          :disabled="todo.id < 0"
          @click="deleteTodo(todo)"
        />
      </li>
    </ul>
  </form>
</template>
