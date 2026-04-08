<script setup lang="ts">
import { ref, onMounted } from "vue";

const isVisible = ref(false);

const advantages = [
  {
    icon: "measure",
    title: "Бесплатный замер",
    description: "Выезд специалиста бесплатно",
  },
  {
    icon: "speed",
    title: "Быстрый монтаж",
    description: "Установка за 1-2 дня",
  },
  {
    icon: "price",
    title: "Прозрачные цены",
    description: "Без скрытых платежей",
  },
  {
    icon: "delivery",
    title: "Бесплатная доставка",
    description: "Привезем и разгрузим бесплатно",
  },
];

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <section class="hero" id="hero">
    <!-- Background Pattern -->
    <div class="hero-pattern" aria-hidden="true">
      <div class="pattern-circle pattern-circle-1"></div>
      <div class="pattern-circle pattern-circle-2"></div>
      <div class="pattern-circle pattern-circle-3"></div>
      <div class="pattern-grid"></div>
    </div>

    <div class="container hero-container">
      <div class="hero-content" :class="{ visible: isVisible }">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Производство и монтаж
        </div>

        <h1 class="hero-title">
          Мягкие окна из гибкого ПВХ
          <span class="title-accent">от 799₽/м²</span>
        </h1>

        <p class="hero-subtitle">
          Производство и монтаж точно в срок. Защитите веранду, беседку или
          террасу от непогоды с сохранением обзора.
        </p>

        <div class="hero-buttons">
          <a href="#quiz" class="btn btn-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Рассчитать стоимость
          </a>
          <a href="tel:+79991234567" class="btn btn-secondary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
            Получить консультацию
          </a>
        </div>
      </div>

      <div class="hero-visual" :class="{ visible: isVisible }">
        <div class="visual-card">
          <div class="visual-image">
            <img
              src="public/img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg"
              alt="Веранда с мягкими окнами из ПВХ"
              loading="eager"
            />
            <div class="visual-overlay"></div>
          </div>
          <div class="visual-float visual-float-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Гарантия 5 лет</span>
          </div>
          <div class="visual-float visual-float-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Монтаж за 1-2 дня</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Advantages Grid -->
    <div class="hero-advantages" :class="{ visible: isVisible }">
      <div class="container">
        <div class="advantages-grid">
          <div
            v-for="(advantage, index) in advantages"
            :key="advantage.icon"
            class="advantage-card"
            :style="{ animationDelay: `${0.4 + index * 0.1}s` }"
          >
            <div class="advantage-icon">
              <!-- Бесплатный замер -->
              <svg
                v-if="advantage.icon === 'measure'"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M3 21l18-18" />
                <path d="M14 3h7v7" />
                <path d="M5 9l4 4" />
              </svg>

              <!-- Скорость -->
              <svg
                v-else-if="advantage.icon === 'speed'"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>

              <!-- Цена -->
              <svg
                v-else-if="advantage.icon === 'price'"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 6v2m0 8v2" />
              </svg>

              <!-- Бесплатная доставка -->
              <svg
                v-else-if="advantage.icon === 'delivery'"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div class="advantage-content">
              <h3 class="advantage-title">{{ advantage.title }}</h3>
              <p class="advantage-description">{{ advantage.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave Divider -->
    <div class="wave-divider bottom" aria-hidden="true">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  padding: 22rem 0 16rem;
  background: var(--gradient-hero);
  overflow: hidden;
}

/* Background Pattern */
.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.pattern-circle {
  position: absolute;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.05;
}

.pattern-circle-1 {
  width: 60rem;
  height: 60rem;
  top: -20rem;
  right: -10rem;
  animation: float 20s ease-in-out infinite;
}

.pattern-circle-2 {
  width: 40rem;
  height: 40rem;
  bottom: 10rem;
  left: -15rem;
  animation: float 15s ease-in-out infinite reverse;
}

.pattern-circle-3 {
  width: 25rem;
  height: 25rem;
  top: 40%;
  right: 20%;
  animation: float 18s ease-in-out infinite;
}

.pattern-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(var(--border-light) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}

/* Container */
.hero-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
}

@media (max-width: 1023.98px) {
  .hero {
    padding: 14rem 0 16rem;
  }
}

/* Content */
.hero-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: 5rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.hero-title {
  font-size: clamp(3.6rem, 6vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.title-accent {
  display: block;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.8rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 3rem;
  max-width: 50rem;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

/* Visual */
.hero-visual {
  position: relative;
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s ease 0.2s;
}

.hero-visual.visible {
  opacity: 1;
  transform: translateX(0);
}

.visual-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: visible;
}

.visual-image {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.visual-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  aspect-ratio: 4/3;
}

.visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(130, 219, 247, 0.1) 0%,
    transparent 50%
  );
}

/* Floating Cards */
.visual-float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2rem;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  animation: float 6s ease-in-out infinite;
}

.visual-float svg {
  color: var(--accent);
}

.visual-float-1 {
  top: -2rem;
  right: -2rem;
  animation-delay: -2s;
}

.visual-float-2 {
  bottom: 3rem;
  left: -3rem;
  animation-delay: -4s;
}

@media (max-width: 768px) {
  .visual-float-1 {
    top: -1rem;
    right: 1rem;
  }

  .visual-float-2 {
    bottom: 2rem;
    left: 1rem;
  }
}

/* Advantages */
.hero-advantages {
  margin-top: 6rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.4s;
}

.hero-advantages.visible {
  opacity: 1;
  transform: translateY(0);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 2rem;
}

.advantage-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent);
}

.advantage-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.6rem;
  height: 5.6rem;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  color: white;
  flex-shrink: 0;
}

.advantage-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.advantage-description {
  font-size: 1.4rem;
  color: var(--text-muted);
  margin: 0;
}

/* Wave */
.wave-divider.bottom svg path {
  fill: var(--bg-secondary);
}
</style>
