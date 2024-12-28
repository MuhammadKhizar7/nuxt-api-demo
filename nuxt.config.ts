// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@scalar/nuxt', 'nuxt-auth-utils', '@nuxt/ui'],
  nitro: {
    experimental: {
      openAPI: true,
      database: true
    },
    openAPI: {
    meta: {
      title: 'My Awesome Project',
      description: 'This might become the next big thing.',
      version: '1.0'
    }
  },
}

})
