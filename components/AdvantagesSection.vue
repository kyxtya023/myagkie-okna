<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

const advantages = [
  {
    id: 1,
    number: '01',
    title: 'Защита от непогоды',
    description: 'Надежная защита от дождя, ветра и снега. Сохраняйте комфорт на веранде в любую погоду.',
    icon: 'shield'
  },
  {
    id: 2,
    number: '02',
    title: 'Сохранение тепла',
    description: 'Пленка удерживает тепло внутри, позволяя использовать пространство до глубокой осени.',
    icon: 'sun'
  },
  {
    id: 3,
    number: '03',
    title: 'Прозрачность',
    description: 'Кристальная прозрачность пленки сохраняет панорамный обзор и естественное освещение.',
    icon: 'eye'
  },
  {
    id: 4,
    number: '04',
    title: 'Простота использования',
    description: 'Легко сворачиваются и разворачиваются. Проветривание одним движением руки.',
    icon: 'hand'
  },
  {
    id: 5,
    number: '05',
    title: 'Долговечность',
    description: 'Срок службы более 10 лет при правильном уходе. Устойчивость к УФ-излучению.',
    icon: 'clock'
  },
  {
    id: 6,
    number: '06',
    title: 'Экономия',
    description: 'Доступная альтернатива традиционному остеклению. Экономия до 70% бюджета.',
    icon: 'wallet'
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

  const section = document.getElementById('advantages')
  if (section) observer.observe(section)
})
</script>

<template>
  <section class="advantages section" id="advantages">
    <div class="container">
      <div class="advantages-layout">
        <!-- Left Column -->
        <div class="advantages-header" :class="{ visible: isVisible }">
          <h2 class="section-title">Преимущества<br/>мягких окон</h2>
          <p class="section-description">
            Мягкие окна из ПВХ — современное и практичное решение для защиты открытых пространств. Узнайте, почему тысячи клиентов выбирают именно их.
          </p>
          <a href="#quiz" class="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Рассчитать стоимость
          </a>
        </div>

        <!-- Right Column - Cards -->
        <div class="advantages-grid">
          <article
            v-for="(item, index) in advantages"
            :key="item.id"
            class="advantage-card"
            :class="{ visible: isVisible }"
            :style="{ animationDelay: `${0.1 + index * 0.1}s` }"
          >
            <div class="card-number">{{ item.number }}</div>
            <div class="card-icon">
              <svg v-if="item.icon === 'shield'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <svg v-else-if="item.icon === 'sun'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              <svg v-else-if="item.icon === 'eye'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else-if="item.icon === 'hand'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
              </svg>
              <svg v-else-if="item.icon === 'clock'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
              </svg>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-description">{{ item.description }}</p>
            </div>
                          <div class="card-shine" aria-hidden="true"></div>
          </article>
        </div>
      </div>
    </div>

    <!-- Decorative Lines -->
    <div class="advantages-decor" aria-hidden="true">
      <div class="decor-line decor-line-1"></div>
      <div class="decor-line decor-line-2"></div>
      <div class="decor-line decor-line-3"></div>
    </div>
  </section>
</template>

<style scoped>
.advantages {
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

/* Layout */
.advantages-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem;
}

@media (min-width: 1024px) {
  .advantages-layout {
    grid-template-columns: 1fr 1.5fr;
    gap: 8rem;
    align-items: start;
  }
}

/* Header */
.advantages-header {
  position: sticky;
  top: 12rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.advantages-header.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1023px) {
  .advantages-header {
    position: relative;
    top: 0;
    text-align: center;
  }
}

.section-title {
  font-size: clamp(3rem, 5vw, 4.5rem);
  margin-bottom: 2rem;
  line-height: 1.1;
}

.section-description {
  font-size: 1.7rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 3rem;
}

/* Grid */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2rem;
}

@media (min-width: 768px) {
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Card */
.advantage-card {
  position: relative;
  padding: 3rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateY(30px) rotate(-1deg);
}

.advantage-card:nth-child(even) {
  transform: translateY(30px) rotate(1deg);
}

.advantage-card.visible {
  animation: fadeInUp 0.6s ease forwards;
}

.advantage-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent);
}

.advantage-card {
  position: relative;
  padding: 3rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateY(30px);
}

.advantage-card.visible {
  animation: fadeInUp 0.6s ease forwards;
}

.advantage-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent);
}

.advantage-card:hover .card-shine {
  transform: translateX(100%);
}

/* Card Shine Effect */
.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(130, 219, 247, 0.1) 50%,
    transparent 100%
  );
  transition: transform 0.6s ease;
  pointer-events: none;
}

/* Number */
.card-number {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 4rem;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: var(--accent);
  opacity: 0.15;
  line-height: 1;
}

/* Icon */
.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.6rem;
  height: 5.6rem;
  background: rgba(130, 219, 247, 0.1);
  border-radius: var(--radius-md);
  color: var(--accent);
  margin-bottom: 2rem;
  transition: all var(--transition-base);
}

.advantage-card:hover .card-icon {
  background: var(--gradient-primary);
  color: white;
  transform: rotate(-5deg) scale(1.1);
}

/* Content */
.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.card-description {
  font-size: 1.5rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0;
}

/* Decorative */
.advantages-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.decor-line {
  position: absolute;
  width: 200%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%);
  opacity: 0.08;
}

.decor-line-1 {
  top: 15%;
  left: -50%;
  transform: rotate(-5deg);
}

.decor-line-2 {
  top: 50%;
  left: -50%;
  transform: rotate(3deg);
}

.decor-line-3 {
  top: 85%;
  left: -50%;
  transform: rotate(-2deg);
}
</style>
