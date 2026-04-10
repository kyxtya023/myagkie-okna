<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { WhyUsCard } from '~/types'

const isVisible = ref(false)
const activeIndex = ref(0)

const cards: WhyUsCard[] = [
  {
    id: 1,
    icon: 'measure',
    title: 'Бесплатный выезд замерщика',
    description: 'Специалист приедет в удобное время, снимет точные размеры и проконсультирует по всем вопросам',
    alt: 'Иконка замерщика с рулеткой'
  },
  {
    id: 2,
    icon: 'team',
    title: 'Опытные монтажники',
    description: 'Наши специалисты имеют многолетний опыт установки мягких окон любой сложности',
    alt: 'Иконка команды монтажников'
  },
  {
    id: 3,
    icon: 'install',
    title: 'Профессиональная установка',
    description: 'Монтаж выполняется аккуратно и качественно с соблюдением всех технологий',
    alt: 'Иконка установки окна'
  },
  {
    id: 4,
    icon: 'price',
    title: 'Честные цены',
    description: 'Фиксированная стоимость без скрытых платежей и неожиданных доплат',
    alt: 'Иконка прозрачного ценообразования'
  },
  {
    id: 5,
    icon: 'quality',
    title: 'Качественные материалы',
    description: 'Используем только сертифицированную пленку ПВХ от проверенных производителей',
    alt: 'Иконка знака качества'
  },
  {
    id: 6,
    icon: 'speed',
    title: 'Быстрые сроки',
    description: 'Изготовление от 5 дней, монтаж за 1 день',
    alt: 'Иконка быстрого выполнения'
  },
  {
    id: 7,
    icon: 'factory',
    title: 'Собственное производство',
    description: 'Изготавливаем окна на своем производстве, контролируя каждый этап',
    alt: 'Иконка завода'
  },
  {
    id: 8,
    icon: 'individual',
    title: 'Индивидуальный подход',
    description: 'Учитываем все пожелания и особенности вашего объекта',
    alt: 'Иконка индивидуального подхода'
  }
]

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

  const section = document.getElementById('why-us')
  if (section) observer.observe(section)
})
</script>

<template>
  <section class="why-us section" id="why-us">
    <div class="container">
      <div class="section-header" :class="{ visible: isVisible }">
        <h2 class="section-title">Почему выбирают нас</h2>
        <p class="section-subtitle">
          Более 500 довольных клиентов доверили нам остекление своих веранд, беседок и террас
        </p>
      </div>

      <div class="why-us-grid">
        <article
          v-for="(card, index) in cards"
          :key="card.id"
          class="why-card"
          :class="{ visible: isVisible, active: activeIndex === index }"
          :style="{ animationDelay: `${0.1 + index * 0.08}s` }"
          @mouseenter="activeIndex = index"
        >
          <div class="card-icon">

            <svg v-if="card.icon === 'measure'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <path d="M21 3H3v18h18V3z"/>
              <path d="M21 9H15M21 15H15M9 3v18"/>
            </svg>

            <svg v-else-if="card.icon === 'team'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>

            <svg v-else-if="card.icon === 'install'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>

            <svg v-else-if="card.icon === 'price'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <circle cx="12" cy="12" r="10"/>
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
              <path d="M12 6v2m0 8v2"/>
            </svg>

            <svg v-else-if="card.icon === 'warranty'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>

            <svg v-else-if="card.icon === 'delivery'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>

            <svg v-else-if="card.icon === 'quality'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>

            <svg v-else-if="card.icon === 'speed'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>

            <svg v-else-if="card.icon === 'factory'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <path d="M2 20h20"/>
              <path d="M5 20V8l4 4V8l4 4V4h6v16"/>
              <path d="M19 12h-2"/>
              <path d="M19 8h-2"/>
            </svg>

            <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :aria-label="card.alt">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-description">{{ card.description }}</p>
          </div>

          <div class="card-glow" aria-hidden="true"></div>
        </article>
      </div>
    </div>


    <div class="why-us-decor" aria-hidden="true">
      <div class="decor-line decor-line-1"></div>
      <div class="decor-line decor-line-2"></div>
    </div>
  </section>
</template>

<style scoped>
.why-us {
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.section-header {
  text-align: center;
  margin-bottom: 6rem;
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


.why-us-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.5rem;
}

@media (min-width: 1200px) {
  .why-us-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .why-us-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.why-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateY(30px) rotate(-1deg);
  overflow: hidden;
}

.why-card:nth-child(even) {
  transform: translateY(30px) rotate(1deg);
}

.why-card.visible {
  animation: fadeInUp 0.6s ease forwards;
}

.why-card.visible:nth-child(even) {
  animation: fadeInUpAlt 0.6s ease forwards;
}

@keyframes fadeInUpAlt {
  from {
    opacity: 0;
    transform: translateY(30px) rotate(1deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }
}

.why-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent);
}

.why-card.active {
  border-color: var(--accent);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 0%, var(--accent-glow) 0%, transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
}

.why-card:hover .card-glow {
  opacity: 1;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  color: white;
  margin-bottom: 2rem;
  transition: transform var(--transition-base);
}

.why-card:hover .card-icon {
  transform: scale(1.1) rotate(-5deg);
}

.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.card-description {
  font-size: 1.4rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.why-us-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.decor-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%);
  opacity: 0.1;
}

.decor-line-1 {
  top: 20%;
  left: 0;
  right: 0;
  transform: rotate(-3deg);
}

.decor-line-2 {
  bottom: 30%;
  left: 0;
  right: 0;
  transform: rotate(2deg);
}
</style>
