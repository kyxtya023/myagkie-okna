<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue'
import PricesSection from '~/components/PricesSection.vue'
import MaterialsSection from '~/components/MaterialsSection.vue'
import WhyUsSection from '~/components/WhyUsSection.vue'
import AdvantagesSection from '~/components/AdvantagesSection.vue'
import GallerySection from '~/components/GallerySection.vue'
import FAQSection from '~/components/FAQSection.vue'
import QuizSection from '~/components/QuizSection.vue'
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
