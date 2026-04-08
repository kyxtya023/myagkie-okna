<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { GalleryImage, GalleryCategory } from '~/types'

const isVisible = ref(false)
const activeCategory = ref('all')
const visibleCount = ref(6)
const lightboxImage = ref<GalleryImage | null>(null)

const categories: GalleryCategory[] = [
  { id: 'all', name: 'Все работы' },
  { id: 'verandas', name: 'Веранды' },
  { id: 'balconies', name: 'Балконы' },
  { id: 'gazebos', name: 'Беседки' }
]

const allImages: GalleryImage[] = [
  { id: 1, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Мягкие окна на веранде загородного дома', category: 'verandas' },
  { id: 2, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Остекление веранды ПВХ пленкой', category: 'verandas' },
  { id: 3, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Мягкие окна на балконе', category: 'balconies' },
  { id: 4, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Беседка с мягкими окнами', category: 'gazebos' },
  { id: 5, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Панорамные мягкие окна на террасе', category: 'verandas' },
  { id: 6, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Летняя беседка с защитой от дождя', category: 'gazebos' },
  { id: 7, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Балкон с прозрачными ПВХ окнами', category: 'balconies' },
  { id: 8, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Веранда ресторана с мягким остеклением', category: 'verandas' },
  { id: 9, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Беседка у бассейна', category: 'gazebos' },
  { id: 10, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Зимняя веранда с мягкими окнами', category: 'verandas' },
  { id: 11, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Панорамный балкон', category: 'balconies' },
  { id: 12, src: 'img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg', alt: 'Садовая беседка', category: 'gazebos' }
]

const filteredImages = computed(() => {
  if (activeCategory.value === 'all') {
    return allImages
  }
  return allImages.filter(img => img.category === activeCategory.value)
})

const displayedImages = computed(() => {
  return filteredImages.value.slice(0, visibleCount.value)
})

const hasMore = computed(() => {
  return visibleCount.value < filteredImages.value.length
})

const setCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  visibleCount.value = 6
}

const loadMore = () => {
  visibleCount.value += 6
}

const openLightbox = (image: GalleryImage) => {
  lightboxImage.value = image
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxImage.value = null
  document.body.style.overflow = ''
}

const navigateLightbox = (direction: number) => {
  if (!lightboxImage.value) return
  const currentIndex = filteredImages.value.findIndex(img => img.id === lightboxImage.value!.id)
  let newIndex = currentIndex + direction
  if (newIndex < 0) newIndex = filteredImages.value.length - 1
  if (newIndex >= filteredImages.value.length) newIndex = 0
  lightboxImage.value = filteredImages.value[newIndex]
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.1 }
  )

  const section = document.getElementById('gallery')
  if (section) observer.observe(section)
})
</script>

<template>
  <section class="gallery section" id="gallery">
    <div class="container">
      <div class="section-header" :class="{ visible: isVisible }">
        <h2 class="section-title">Наши работы</h2>
        <p class="section-subtitle">
          Посмотрите примеры выполненных проектов по остеклению веранд, беседок и балконов
        </p>
      </div>

      <!-- Categories -->
      <div class="gallery-categories" :class="{ visible: isVisible }">
        <button
          v-for="category in categories"
          :key="category.id"
          class="category-btn"
          :class="{ active: activeCategory === category.id }"
          @click="setCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Grid -->
      <div class="gallery-grid">
        <article
          v-for="(image, index) in displayedImages"
          :key="image.id"
          class="gallery-item"
          :class="{ visible: isVisible }"
          :style="{ animationDelay: `${0.1 + (index % 6) * 0.1}s` }"
          @click="openLightbox(image)"
        >
          <div class="gallery-image">
            <img 
              :src="image.src" 
              :alt="image.alt"
              loading="lazy"
            />
            <div class="gallery-overlay">
              <div class="gallery-zoom">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <path d="M11 8v6M8 11h6"/>
                </svg>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="gallery-more">
        <button class="btn btn-secondary" @click="loadMore">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          Показать ещё
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div 
          v-if="lightboxImage" 
          class="lightbox" 
          @click.self="closeLightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="lightboxImage.alt"
        >
          <button class="lightbox-close" @click="closeLightbox" aria-label="Закрыть">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <button class="lightbox-nav lightbox-prev" @click="navigateLightbox(-1)" aria-label="Предыдущее фото">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div class="lightbox-content">
            <img :src="lightboxImage.src" :alt="lightboxImage.alt" />
          </div>

          <button class="lightbox-nav lightbox-next" @click="navigateLightbox(1)" aria-label="Следующее фото">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery {
  background: var(--bg-secondary);
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  margin-bottom: 2rem;
}

.section-subtitle {
  max-width: 60rem;
  margin: 0 auto;
  font-size: 1.8rem;
  color: var(--text-secondary);
}

/* Categories */
.gallery-categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease 0.2s;
}

.gallery-categories.visible {
  opacity: 1;
  transform: translateY(0);
}

.category-btn {
  padding: 1rem 2.4rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 5rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.category-btn.active {
  color: white;
  background: var(--gradient-primary);
  border-color: var(--accent);
  box-shadow: 0 4px 15px var(--accent-glow);
}

/* Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 2rem;
}

@media (min-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Item */
.gallery-item {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.gallery-item.visible {
  animation: galleryFadeIn 0.6s ease forwards;
}

@keyframes galleryFadeIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.gallery-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.gallery-item:hover .gallery-image img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-zoom {
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: white;
  transform: scale(0.8);
  transition: transform var(--transition-base);
}

.gallery-item:hover .gallery-zoom {
  transform: scale(1);
}

/* Load More */
.gallery-more {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lightbox-nav:hover {
  background: var(--accent);
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
}

/* Transitions */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: all 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-from .lightbox-content,
.lightbox-leave-to .lightbox-content {
  transform: scale(0.9);
}
</style>
