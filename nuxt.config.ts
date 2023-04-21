// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],
  css: [
    '~/assets/css/main.scss'
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Samantha AI',
      short_name: 'Samantha',
      theme_color: '#3b82f6',
      icons: [
        {
          src: 'favicon.ico',
          sizes: '192x192',
          type: 'image/ico',
        },
        {
          src: 'favicon.ico',
          sizes: '512x512',
          type: 'image/ico',
        },
        {
          src: 'favicon.ico',
          sizes: '512x512',
          type: 'image/ico',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      // periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})
