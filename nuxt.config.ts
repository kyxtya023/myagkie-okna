// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Мягкие окна из ПВХ — производство и монтаж | От 799₽/м²',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Производство и монтаж мягких окон из гибкого ПВХ от 799₽/м². Качественные материалы, быстрый монтаж, прозрачные цены. Бесплатный замер при заказе.' 
        },
        { 
          name: 'keywords', 
          content: 'мягкие окна, гибкие окна, ПВХ окна, остекление веранды, остекление беседки, мягкие окна для террасы' 
        },
        { name: 'author', content: 'Мягкие Окна' },
        { name: 'theme-color', content: '#82dbf7' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Мягкие окна из ПВХ — производство и монтаж | От 799₽/м²' },
        { property: 'og:description', content: 'Производство и монтаж мягких окон из гибкого ПВХ. Качественные материалы, быстрый монтаж, прозрачные цены.' },
        { property: 'og:locale', content: 'ru_RU' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Мягкие окна из ПВХ — производство и монтаж' },
        { name: 'twitter:description', content: 'Производство и монтаж мягких окон из гибкого ПВХ от 799₽/м²' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { 
          rel: 'preconnect', 
          href: 'https://fonts.googleapis.com' 
        },
        { 
          rel: 'preconnect', 
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&display=swap'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Мягкие Окна',
            'description': 'Производство и монтаж мягких окон из гибкого ПВХ',
            'priceRange': 'от 799₽/м²',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Москва',
              'addressCountry': 'RU'
            },
            'openingHours': 'Mo-Su 09:00-21:00',
            'telephone': '+7 (999) 123-45-67'
          })
        }
      ]
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxt/image', '@nuxt/icon'
  ],

  runtimeConfig: {
    // Server-side only
    mailHost: process.env.MAIL_HOST || 'smtp.gmail.com',
    mailPort: process.env.MAIL_PORT || '587',
    mailUser: process.env.MAIL_USER || '',
    mailPass: process.env.MAIL_PASS || '',
    mailTo: process.env.MAIL_TO || '',
    // Public (client-side)
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  },

  nitro: {
    preset: 'node-server'
  },

  typescript: {
    strict: true
  }
})
