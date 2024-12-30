<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined
})
const { fetch } = useUserSession()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
 $fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(event.data)
  }).then(() => {
    fetch()
    navigateTo('/')
  })
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-5">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-primary-500 hover:underline">
        Login
      </NuxtLink>
    </p>
  </UForm>
</template>

