import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'shadcn-nuxt',
    'motion-v/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
  ],
  // Components are grouped in folders by page, but referenced by file name only.
  // `ui/` is registered separately by shadcn-nuxt.
  components: [{ path: '~/components', pathPrefix: false, ignore: ['ui/**'] }],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Rofiqur Rohman',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['~/assets/css/tailwind.css'],
  // `url` comes from NUXT_PUBLIC_SITE_URL (read by nuxt-site-config).
  site: {
    name: 'Rofiqur Rohman',
    defaultLocale: 'en',
  },
  runtimeConfig: {
    mongodbUri: '',
    mongodbDbName: 'portfolio',
    githubToken: '',
  },
  // Pages and API responses are cached on Vercel and revalidated in the background,
  // so edits made in MongoDB show up within about a minute.
  routeRules: {
    '/**': { isr: 60 },
    '/api/**': { isr: 60 },
    '/api/github-contributions': { isr: 86400 },
  },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss()],
  },
  aiReady: {
    enabled: false,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  linkChecker: {
    enabled: false,
  },
  ogImage: {
    enabled: false,
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
  skewProtection: {
    enabled: false,
  },
})
