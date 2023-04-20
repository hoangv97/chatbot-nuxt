// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel'
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  css: [
    '~/assets/css/main.scss'
  ],
})
