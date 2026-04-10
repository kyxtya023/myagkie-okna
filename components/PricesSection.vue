<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PriceCard } from "~/types";

const isVisible = ref(false);

const priceCards: PriceCard[] = [
  {
    title: "Мягкое окно «Эконом»",
    description: [
      "Пленка ПВХ 500 мкм",
      "3 цвета окантовки: белый, серый, коричневый",
      "Возможен вариант без окантовки (пленка на отрез)",
    ],
    prices: [{ value: "от 800 руб/м²" }],
    badge: "Популярный",
    image: "img/prices-1.jpg",
  },
  {
    title: "Мягкое окно «Стандарт»",
    description: [
      "Пленка ПВХ 700 мкм",
      "Окантовка ткань ПВХ, цвет стандарт (белый, серый, коричневый)",
    ],
    prices: [{ value: "от 1500 руб/м²" }],
    badge: "Популярный",
    image: "img/prices-2.jpg",
  },
  {
    title: "Мягкое окно «Тонированное»",
    description: [
      "Пленка ПВХ 700 мкм тонированная",
      "Окантовка ПВХ стандарт (коричневый, серый, белый)",
      "Монтаж включен",
    ],
    prices: [{ label: "за м²", value: "от 1800 руб" }],
    image: "img/prices-3.jpg",
  },
  {
    title: "Москитная сетка",
    description: [
      "Окантовка ткань ПВХ",
      "Цвет стандарт (коричневый, серый, белый)",
    ],
    prices: [{ label: "за м²", value: "от 1700 руб" }],
    badge: "Популярный",
    image: "img/prices-4.jpg",
  },
  {
    title: "Мягкое окно «ТПУ»",
    description: [
      "Пленка ПВХ 700 мкм",
      "Окантовка ПВХ стандарт (коричневый, серый, белый)",
      "Монтаж включен",
    ],
    prices: [{ label: "за м²", value: "от 2800 руб" }],
    image: "img/prices-5.jpg",
  },
  {
    title: "Мягкое окно «Нестандартное»",
    description: [
      "Пленка ПВХ 700 мкм",
      "Окантовка ПВХ стандарт (коричневый, серый, белый)",
      "Монтаж включен",
    ],
    prices: [{ label: "за м²", value: "Цена договорная" }],
    image: "img/prices-6.jpg",
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    { threshold: 0.1 },
  );

  const section = document.getElementById("prices");
  if (section) observer.observe(section);
});
</script>

<template>
  <section class="prices section" id="prices">
    <div class="container">
      <div class="section-header" :class="{ visible: isVisible }">
        <h2 class="section-title">Прозрачные цены</h2>
        <p class="section-subtitle">
          Работаем максимально прозрачно - все расчёты фиксируем на месте.
          Никаких скрытых условий и неприятных сюрпризов.
        </p>
      </div>

      <div class="prices-grid">
        <article
          v-for="(card, index) in priceCards"
          :key="card.title"
          class="price-card horizontal"
          :class="{ featured: card.badge, visible: isVisible }"
        >
          <div class="price-image" v-if="card.image">
            <img :src="card.image" :alt="card.title" />
          </div>

          <div class="price-content">
            <div class="price-header">
              <h3 class="price-title">{{ card.title }}</h3>
              <div v-if="card.badge" class="price-badge">
                {{ card.badge }}
              </div>
            </div>

            <div class="price-values">
              <div
                v-for="price in card.prices"
                :key="price.value"
                class="price-item"
              >
                <span v-if="price.label" class="price-label">{{
                  price.label
                }}</span>
                <span class="price-value">{{ price.value }}</span>
              </div>
            </div>

            <ul class="price-features compact">
              <li v-for="(desc, i) in card.description" :key="i">
                {{ desc }}
              </li>
            </ul>

            <a href="#quiz" class="btn btn-primary"> Рассчитать </a>
          </div>
        </article>
      </div>
    </div>

    <div class="prices-decor" aria-hidden="true">
      <div class="decor-blob decor-blob-1"></div>
      <div class="decor-blob decor-blob-2"></div>
    </div>
  </section>
</template>

<style scoped>
.prices {
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  margin-bottom: 1.5rem;
}

.section-subtitle {
  max-width: 70rem;
  margin: 0 auto;
  font-size: 1.6rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* =========================
   GRID
========================= */
.prices-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
}

/* 📱 планшеты */
@media (max-width: 1024px) {
  .prices-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 📱 мобилки */
@media (max-width: 600px) {
  .prices-grid {
    grid-template-columns: 1fr;
  }
}
/* =========================
   CARD (VERTICAL)
========================= */
.price-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateY(40px);
}

.price-card.visible {
  animation: fadeInUp 0.6s ease forwards;
}

.price-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.price-card.featured {
  border: 2px solid var(--accent);
}

/* =========================
   IMAGE
========================= */
.price-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.price-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* =========================
   CONTENT
========================= */
.price-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex: 1;
}

.price-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.price-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
}

.price-badge {
  padding: 0.4rem 1.2rem;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 1.2rem;
  border-radius: 2rem;
  font-weight: 600;
  white-space: nowrap;
}

/* =========================
   PRICE BLOCK
========================= */
.price-values {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.price-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price-label {
  font-size: 1.2rem;
  color: var(--text-muted);
}

.price-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--accent);
  font-family: "Montserrat", sans-serif;
}

/* =========================
   FEATURES
========================= */
.price-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.price-features li {
  font-size: 1.3rem;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.2rem;
}

.price-features li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--accent);
}

/* =========================
   BUTTON
========================= */
.price-card .btn {
  margin-top: auto;
  width: 100%;
  text-align: center;
}

/* =========================
   ANIMATION
========================= */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================
   DECOR
========================= */
.prices-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.decor-blob {
  position: absolute;
  border-radius: var(--radius-blob);
  background: var(--accent);
  opacity: 0.03;
}

.decor-blob-1 {
  width: 40rem;
  height: 40rem;
  top: -10rem;
  left: -10rem;
}

.decor-blob-2 {
  width: 35rem;
  height: 35rem;
  bottom: -10rem;
  right: -10rem;
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .price-card {
    max-width: 100%;
  }

  .price-image {
    height: 180px;
  }

  .price-title {
    font-size: 1.6rem;
  }

  .price-value {
    font-size: 1.6rem;
  }
}
</style>
