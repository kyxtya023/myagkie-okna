<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

type MaterialCard = {
  title: string;
  description: string;
  features?: string[];
  image?: string;
  badge?: string;
};

type MaterialTab = {
  id: string;
  label: string;
  intro: string;
  mode: "cards" | "mixed";
  summary?: string[];
  cards: MaterialCard[];
};

const isVisible = ref(false);
const activeTab = ref("film");

const tabs: MaterialTab[] = [
  {
    id: "film",
    label: "Пленка",
    intro:
      "Для производства изделий из ПВХ мы используем прозрачную пленку корейского производства. Материал проверен на практике и хорошо держит нагрузку, погоду и перепады температуры.",
    mode: "mixed",
    summary: [
      "Пленка ПВХ 700 мкм",
      "Морозостойкость до -39°C",
      "Высокая светопропускная способность",
      "Стойкость к дождю, ветру и снегу",
    ],
    cards: [
      {
        title: "Пленка 700 микрон",
        description:
          "Толстая и прочная пленка с повышенной стойкостью к механическим нагрузкам, ветру и осадкам.",
        features: [
          "Толщина 700 мкм",
          "Повышенная прочность",
          "Стабильная геометрия",
          "Корейское производство",
          "Прозрачная структура",
          "Для веранд и террас",
        ],
        image: "img/df645eg.jpg",
        badge: "Базовый вариант",
      },
    ],
  },
  {
    id: "binding",
    label: "Окантовка",
    intro:
      "Окантовка усиливает конструкцию, служит местом установки люверсов и придает окну законченный внешний вид. Ниже собраны основные варианты, которые можно показать отдельно.",
    mode: "mixed",
    cards: [
      {
        title: "Окантовка ПВХ",
        description:
          "Классический вариант для мягких окон. Имеет глянцевую поверхность, широкий выбор цветов и высокую стойкость к солнцу, влаге и осадкам.",
        features: [
          "Ширина 5 см",
          "Широкая цветовая палитра",
          "Максимальная износостойкость",
          "Легко мыть",
        ],
        image: "img/2-1.jpg",
        badge: "Базовый вариант",
      },
    ],
  },
  {
    id: "hardware",
    label: "Фурнитура",
    intro:
      "Без надежной фурнитуры мягкие окна не будут держаться и нормально работать. Здесь лучше показывать как карточки, потому что у каждого элемента своя задача.",
    mode: "cards",
    cards: [
      {
        title: "Скоба с силиконовым ремешком",
        description:
          "Самый распространенный вариант крепления. Конструкция простая, надежная и бюджетная, хорошо подходит для повседневного использования.",
        features: [
          "Бюджетное решение",
          "Простая установка",
          "Надежная фиксация",
        ],
        image: "img/3-1.jpg",
      },
      {
        title: "Французский замок",
        description:
          "Решение для надежной фиксации и плотного прижима. Часто используется там, где важна стабильность крепления.",
        features: [
          "Плотная фиксация",
          "Надежность",
          "Подходит для разных объектов",
        ],
        image: "img/3-2.jpg",
      },
      {
        title: "Двусторонняя молния",
        description:
          "Практичное решение для входных групп и удобного доступа. Позволяет использовать конструкцию без лишнего дискомфорта.",
        features: [
          "Удобный проход",
          "Двухстороннее открытие",
          "Для входных групп",
        ],
        image: "img/3-3.jpg",
      },
      {
        title: "Люверсы",
        description:
          "Металлические элементы, через которые выполняется посадка конструкции на поверхность. Могут быть разных форм в зависимости от задачи.",
        features: ["Металлические", "Прочная посадка", "Разные формы"],
        image: "img/3-4.jpg",
      },
      {
        title: "Полимерная скоба",
        description:
          "Хорошее продолжение больших стальных скоб. Используется вместе с люверсом 42x22, отлично подходит для полотен от 10 м².",
        features: ["Для больших полотен", "Не боится мороза", "Разные цвета"],
        image: "img/3-5.jpg",
      },
      {
        title: "Подвязочные ремешки",
        description:
          "Ремни нужны для фиксации окон в поднятом положении. Бывают прозрачные и под цвет окантовки, служат в любую погоду.",
        features: [
          "Для рулонной фиксации",
          "Всесезонное использование",
          "Прочные материалы",
        ],
        image: "img/3-6.jpg",
      },
    ],
  },
];

const activeTabData = computed(() => {
  return tabs.find((tab) => tab.id === activeTab.value) || tabs[0];
});

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

  const section = document.getElementById("materials");
  if (section) observer.observe(section);
});
</script>

<template>
  <section class="materials section" id="materials">
    <div class="container">
      <div class="section-header" :class="{ visible: isVisible }">
        <h2 class="section-title">Материалы и комплектующие</h2>
        <p class="section-subtitle">
          Показали разделы так, чтобы блок был живым: где нужно — карточки, где
          важнее смысл — обычный текст.
        </p>
      </div>

      <div class="materials-tabs" :class="{ visible: isVisible }">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="materials-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="materials-panel" :class="{ visible: isVisible }">
        <div class="materials-panel-head">
          <h3 class="materials-panel-title">{{ activeTabData.label }}</h3>
          <p class="materials-panel-intro">
            {{ activeTabData.intro }}
          </p>
        </div>

        <div v-if="activeTabData.summary?.length" class="materials-summary">
          <div
            v-for="item in activeTabData.summary"
            :key="item"
            class="summary-item"
          >
            {{ item }}
          </div>
        </div>

        <div v-if="activeTabData.mode === 'cards'" class="materials-grid">
          <article
            v-for="(material, index) in activeTabData.cards"
            :key="material.title"
            class="material-card"
            :class="{ visible: isVisible, featured: material.badge }"
            :style="{ animationDelay: `${0.15 + index * 0.08}s` }"
          >
            <div v-if="material.image" class="material-image">
              <img :src="material.image" :alt="material.title" loading="lazy" />
              <div class="material-overlay"></div>
              <div v-if="material.badge" class="material-badge">
                {{ material.badge }}
              </div>
            </div>

            <div class="material-content">
              <h4 class="material-title">{{ material.title }}</h4>
              <p class="material-description">{{ material.description }}</p>

              <ul v-if="material.features?.length" class="material-features">
                <li v-for="feature in material.features" :key="feature">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>

        <div v-else class="materials-mixed">
          <article
            v-for="(material, index) in activeTabData.cards"
            :key="material.title"
            class="material-card material-card-wide"
            :class="{ visible: isVisible, featured: material.badge }"
            :style="{ animationDelay: `${0.15 + index * 0.08}s` }"
          >
            <div v-if="material.image" class="material-image">
              <img :src="material.image" :alt="material.title" loading="lazy" />
              <div class="material-overlay"></div>
              <div v-if="material.badge" class="material-badge">
                {{ material.badge }}
              </div>
            </div>

            <div class="material-content">
              <h4 class="material-title">{{ material.title }}</h4>
              <p class="material-description">{{ material.description }}</p>

              <ul v-if="material.features?.length" class="material-features">
                <li v-for="feature in material.features" :key="feature">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>

      <div class="materials-cta" :class="{ visible: isVisible }">
        <div class="cta-content">
          <h3>Нужна помощь с выбором?</h3>
          <p>
            Подскажем, что лучше поставить под ваш объект: пленку, окантовку или
            фурнитуру.
          </p>
        </div>
        <a href="#quiz" class="btn btn-primary">Получить консультацию</a>
      </div>
    </div>

    <div class="materials-decor" aria-hidden="true">
      <div class="decor-blob decor-blob-1"></div>
      <div class="decor-blob decor-blob-2"></div>
    </div>
  </section>
</template>

<style scoped>
.materials {
  background: var(--bg-tertiary);
  position: relative;
  overflow: hidden;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
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
  max-width: 68rem;
  margin: 0 auto;
  font-size: 1.7rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.materials-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.1s;
}

.materials-tabs.visible {
  opacity: 1;
  transform: translateY(0);
}

.materials-tab {
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

.materials-tab:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.materials-tab.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
  box-shadow: 0 8px 24px var(--accent-glow);
}

.materials-panel {
  padding: 2.5rem;
  background: var(--bg-glass);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.8s ease 0.15s;
}

.materials-panel.visible {
  opacity: 1;
  transform: translateY(0);
}

.materials-panel-head {
  margin-bottom: 2rem;
}

.materials-panel-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.materials-panel-intro {
  font-size: 1.6rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.materials-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.summary-item {
  padding: 0.9rem 1.2rem;
  border-radius: 999px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-size: 1.3rem;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2rem;
}

@media (min-width: 1200px) {
  .materials-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.material-card {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateY(40px);
}

.material-card.visible {
  animation: fadeInUp 0.6s ease forwards;
}

.material-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.material-card.featured {
  border-color: var(--accent);
}

.material-card-wide {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 24rem;
}

.material-card-wide .material-image {
  height: 100%;
}

.material-card-wide .material-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.material-image {
  position: relative;
  height: 22rem;
  overflow: hidden;
}

.material-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.material-card:hover .material-image img {
  transform: scale(1.08);
}

.material-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.35) 0%, transparent 55%);
}

.material-badge {
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: var(--gradient-primary);
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  z-index: 1;
}

.material-content {
  padding: 2.2rem;
}

.material-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.material-description {
  font-size: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.8rem;
}

.material-features {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.2rem;
}

.material-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.material-features svg {
  flex-shrink: 0;
  color: var(--accent);
  margin-top: 0.2rem;
}

.materials-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
  padding: 3rem;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.25s;
}

.materials-cta.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 768px) {
  .materials-cta {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.cta-content h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.cta-content p {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin: 0;
}

.materials-decor {
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
  width: 50rem;
  height: 50rem;
  bottom: -20rem;
  left: -15rem;
  animation: float 20s ease-in-out infinite;
}

.decor-blob-2 {
  width: 40rem;
  height: 40rem;
  top: -15rem;
  right: -10rem;
  animation: float 15s ease-in-out infinite reverse;
}

@media (max-width: 1024px) {
  .material-card-wide {
    grid-template-columns: 1fr;
  }

  .material-card-wide .material-image {
    height: 20rem;
  }
}

@media (max-width: 768px) {
  .materials-panel {
    padding: 2rem;
  }

  .materials-grid {
    grid-template-columns: 1fr;
  }

  .material-features {
    grid-template-columns: 1fr;
  }

  .materials-summary {
    gap: 0.8rem;
  }

  .summary-item {
    width: 100%;
  }
}
</style>
