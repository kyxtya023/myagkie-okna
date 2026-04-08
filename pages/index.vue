<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue'
import PricesSection from '~/components/PricesSection.vue'
import MaterialsSection from '~/components/MaterialsSection.vue'
import WhyUsSection from '~/components/WhyUsSection.vue'
import AdvantagesSection from '~/components/AdvantagesSection.vue'
import GallerySection from '~/components/GallerySection.vue'
import FAQSection from '~/components/FAQSection.vue'
import QuizSection from '~/components/QuizSection.vue'

// SEO
useHead({
  title: 'Мягкие окна из ПВХ — производство и монтаж | От 799₽/м²',
  meta: [
    { 
      name: 'description', 
      content: 'Производство и монтаж мягких окон из гибкого ПВХ от 799₽/м². Качественные материалы, быстрый монтаж за 1-2 дня, прозрачные цены. Бесплатный замер при заказе.' 
    }
  ]
})

// Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'Мягкие окна из ПВХ',
        'description': 'Производство и монтаж мягких окон из гибкого ПВХ',
        'offers': {
          '@type': 'AggregateOffer',
          'lowPrice': '799',
          'highPrice': '3500',
          'priceCurrency': 'RUB',
          'offerCount': '3'
        },
        'brand': {
          '@type': 'Brand',
          'name': 'МягкиеОкна'
        }
      })
    }
  ]
})
</script>

<template>
  <div class="home-page">
    <HeroSection />
    <PricesSection />
    <MaterialsSection />
    <WhyUsSection />
    <AdvantagesSection />
    <GallerySection />
    <FAQSection />
    <QuizSection />
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>
