<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PriceCard } from "~/types";

const isVisible = ref(false);

const priceCards: PriceCard[] = [
  {
    title: "Комплект «Эконом»",
    description: [
      "Пленка 700 мкм, морозостойкая до -39°C",
      "5 цветов окантовки: белый, серый, коричневый, черный, бежевый",
      "Возможен вариант без окантовки (пленка на отрез)",
    ],
    prices: [
      { value: "от 1600 руб/м²" },
      { value: "1200 руб/м²", label: "Без окантовки" },
    ],
    extra: ["Без окантовки (пленка на отрез)"],
    image: "img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg",
  },
  {
    title: "Комплект «Самомонтаж»",
    description: [
      "Пленка 700 мкм, морозостойкая до -39°C",
      "Окантовка ПВХ (коричневый)",
      "Пластиковая поворотная скоба по бокам",
      "Верх — саморезы",
      "Низ — без крепления",
      "Без монтажа",
    ],
    prices: [{ value: "от 1800 руб/м²" }],
    extra: [
      "Цветная окантовка (серый, белый, бежевый, черный) — 100 руб/м²",
      "Нижнее крепление — 200 руб/шт (люверс + скоба)",
    ],
    image: "img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg",
  },
  {
    title: "Под ключ",
    description: [
      "Пленка 700 мкм, морозостойкая до -39°C",
      "Окантовка ПВХ (коричневый)",
      "Поворотные скобы",
      "Верх — саморезы",
      "Низ — без крепления",
      "Монтаж включен",
    ],
    prices: [
      { label: "до 10 м²", value: "от 35000 руб" },
      { label: "10–20 м²", value: "от 50000 руб" },
      { label: "от 20 м²", value: "от 2500 руб/м²" },
    ],
    extra: ["Молнии для входной группы — 1300 руб/пог.м"],
    badge: "Популярный",
    image: "img/fb1ba1a1-82fb-4f70-a0a4-14917676aef0.jpg",
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
          Мы работаем максимально прозрачно: нет ситуации, когда по телефону
          называется одна цена, а при визите замерщика сумма оказывается выше.
          Все расчёты честные, без скрытых условий и сюрпризов.
        </p>
      </div>

      <div class="prices-grid">
        <article
          v-for="(card, index) in priceCards"
          :key="card.title"
          class="price-card horizontal"
          :class="{ featured: card.badge, visible: isVisible }"
        >
          <!-- Image -->
          <div class="price-image" v-if="card.image">
            <img :src="card.image" :alt="card.title" />
          </div>

          <!-- Content -->
          <div class="price-content">
            <div class="price-header">
              <h3 class="price-title">{{ card.title }}</h3>
              <div v-if="card.badge" class="price-badge">
                {{ card.badge }}
              </div>
            </div>

            <!-- Prices -->
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

            <!-- Features -->
            <ul class="price-features compact">
              <li v-for="(desc, i) in card.description" :key="i">
                {{ desc }}
              </li>
            </ul>

            <!-- CTA -->
            <a href="#quiz" class="btn btn-primary"> Рассчитать </a>
          </div>
        </article>
      </div>
    </div>

    <!-- Decorative Elements -->
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

/* Header */
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

/* Grid */
.prices-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .prices-grid {
    grid-template-columns: 1fr;
  }
}

/* =========================
   CARD (ГОРИЗОНТАЛЬНАЯ)
========================= */
.price-card {
  display: grid;
  grid-template-columns: 300px 1fr;
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
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}

/* Featured */
.price-card.featured {
  border: 2px solid var(--accent);
}

/* =========================
   IMAGE
========================= */
.price-image {
  height: 100%;
  position: relative;
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
  gap: 1.2rem;
}

/* Header */
.price-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* Badge */
.price-badge {
  padding: 0.4rem 1.2rem;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 1.2rem;
  border-radius: 2rem;
  font-weight: 600;
}

/* =========================
   PRICES
========================= */
.price-values {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.price-item {
  display: flex;
  flex-direction: column;
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
   FEATURES (КОМПАКТ)
========================= */
.price-features {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 1rem;
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
  width: fit-content;
  margin-top: auto;
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
    grid-template-columns: 1fr;
  }

  .price-image {
    height: 18rem;
  }

  .price-features {
    grid-template-columns: 1fr;
  }

  .price-title {
    font-size: 1.8rem;
  }

  .price-value {
    font-size: 1.6rem;
  }
}
</style>
