// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: true,

  app: {
    baseURL: "/myagkie-okna/",
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      title: "Мягкие окна из ПВХ — производство и монтаж | От 800₽/м²",
      
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Производство и монтаж мягких окон из гибкого ПВХ от 800₽/м². Качественные материалы, быстрый монтаж, прозрачные цены. Бесплатный замер при заказе.' },
        { name: 'keywords', content: 'мягкие окна, гибкие окна, ПВХ окна, остекление веранды, остекление беседки, мягкие окна для террасы' },
        { name: 'author', content: 'Мягкие Окна' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#82dbf7' },

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Мягкие окна из гибкого ПВХ' },
        { property: 'og:title', content: 'Мягкие окна из ПВХ — производство и монтаж | От 800₽/м²' },
        { property: 'og:description', content: 'Производство и монтаж мягких окон из гибкого ПВХ. Качественные материалы, быстрый монтаж, прозрачные цены.' },
        { property: 'og:url', content: 'https://plenochnieokna.ru' },
        { property: 'og:image', content: 'https://plenochnieokna.ru/hero.jpg' },
        { property: 'og:image:secure_url', content: 'https://plenochnieokna.ru/hero.jpg' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Мягкие окна из гибкого ПВХ — прозрачная защита для террасы и веранды' },
        { property: 'og:locale', content: 'ru_RU' },

        { property: 'vk:image', content: 'https://plenochnieokna.ru/hero.jpg' },
        { property: 'vk:title', content: 'Мягкие окна из ПВХ — производство и монтаж | От 800₽/м²' },
        { property: 'vk:description', content: 'Производство и монтаж мягких окон из гибкого ПВХ по Москве и области. Бесплатный замер и гарантия качества!' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Мягкие окна из ПВХ — производство и монтаж | От 800₽/м²' },
        { name: 'twitter:description', content: 'Производство и монтаж мягких окон из гибкого ПВХ от 800₽/м²' },
        { name: 'twitter:image', content: 'https://plenochnieokna.ru/hero.jpg' },
        { name: 'twitter:image:alt', content: 'Мягкие окна из ПВХ — прозрачная защита для террасы и веранды' },
      ],
      link: [
        { rel: 'canonical', href: 'https://plenochnieokna.ru' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-180x180.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-touch-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-touch-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-touch-icon-76x76.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&display=swap' },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Мягкие Окна",
            description: "Производство и монтаж мягких окон из гибкого ПВХ",
            priceRange: "от 800₽/м²",
            url: "https://твой-сайт.ru",
            image: "https://твой-сайт.ru/logo.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Московская область, Королёв",
              streetAddress: "Пионерская улица, 1А",
              addressCountry: "RU",
            },
            openingHours: "Mo-Su 10:00-19:00",
            telephone: "+7 (966) 126-66-06",
            makesOffer: [
              {
                name: "Мягкие окна для веранды",
                priceCurrency: "RUB",
                availability: "https://schema.org/InStock",
              },
              {
                name: "Монтаж мягких окон под ключ",
                priceCurrency: "RUB",
                availability: "https://schema.org/InStock",
              },
            ],
          }),
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/image", "@nuxt/icon"],

  runtimeConfig: {
    // Server-side only
    mailHost: process.env.MAIL_HOST || "smtp.mail.ru",
    mailPort: process.env.MAIL_PORT || "465",
    mailUser: process.env.MAIL_USER || "kyxtya093@mail.ru",
    mailPass: process.env.MAIL_PASS || "z1biumnIR79MIBmrsNuJ",
    mailTo: process.env.MAIL_TO || "kyxtya023@yandex.ru",
    // Public (client-side)
    public: {
      siteUrl: process.env.SITE_URL || "http://localhost:3000",
    },
  },

  nitro: {
    preset: "node-server",
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  vite: {
    build: {
      assetsInlineLimit: 4096,
    },
  },

  typescript: {
    strict: true,
  },
});
