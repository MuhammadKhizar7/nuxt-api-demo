// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@scalar/nuxt'],
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  openAPI: {
  meta: {
    title: 'My Awesome Project',
    description: 'This might become the next big thing.',
    version: '1.0'
  }
}

})