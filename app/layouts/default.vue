<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const { loggedIn, user, clear } = useUserSession()
const colorMode = useColorMode()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
}, { immediate: true })

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

// useHead({
//   htmlAttrs: { lang: 'en' },
//   link: [{ rel: 'icon', href: '/icon.png' }]
// })

// useSeoMeta({
//   viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
//   title: 'nuxt-api-demo',
//   description:
//     'A Nuxt demo api made using db0, authUtils and nuxtjs.',
//   ogImage: '/social-image.png',
//   twitterImage: '/social-image.png',
//   twitterCard: 'summary_large_image'
// })

const items = [
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: clear
    }
  ]
] satisfies DropdownItem[][]
</script>

<template>
  <UContainer class="min-h-screen flex flex-col my-4">
    <div class="mb-2 text-right">
      <ClientOnly>
        <UButton
          square
          variant="ghost"
          color="black"
          :icon="$colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
          @click="toggleColorMode"
        />
      </ClientOnly>
    </div>

    <UCard class="max-w-xl w-full mx-auto">
      <template #header>
        <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold leading-6">
          <NuxtLink to="/">
            Nuxt API Demo
          </NuxtLink>
        </h3>
        <UButton
          v-if="!loggedIn"
          to="/auth/login"
          icon="i-heroicons-finger-print"
          label="Login with email"
          color="black"
          size="xs"
        />
        <div
          v-else
          class="flex flex-wrap -mx-2 sm:mx-0"
        >
          <UButton
            to="/todos"
            icon="i-heroicons-list-bullet"
            label="Todos"
            :color="$route.path === '/todos' ? 'primary' : 'gray'"
            variant="ghost"
          />
          <UButton
            to="/optimistic-todos"
            icon="i-heroicons-sparkles"
            label="Optimistic Todos"
            :color="$route.path === '/optimistic-todos' ? 'primary' : 'gray'"
            variant="ghost"
          />
          <UDropdown
            v-if="user"
            :items="items"
          >
            <UButton
              color="gray"
              variant="ghost"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            >
              <UAvatar
                :src="`https://github.com/${user.name}.png`"
                :alt="user.name"
                size="3xs"
              />
              {{ user.name }}
            </UButton>
          </UDropdown>
        </div>
        </div>
      </template>
      <slot />
    </UCard>

    <footer class="text-center mt-2">
      <NuxtLink
        href="https://github.com/MuhammadKhizar7/nuxt-api-demo"
        target="_blank"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        GitHub
      </NuxtLink>
    </footer>
  </UContainer>
  <UNotifications />
</template>

<style lang="postcss">
body {
  @apply font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>