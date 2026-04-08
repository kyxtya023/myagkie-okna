<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const openItems = ref<number[]>([])

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'Условия бесплатного замера',
    answer: `
      <p><strong>Бесплатный замер предоставляется при соблюдении условий:</strong></p>
      <ul>
        <li>Заключение договора с монтажом</li>
        <li>Предварительная оплата <span class="highlight">30%</span></li>
        <li>Площадь остекления более <span class="highlight">20 м²</span></li>
      </ul>
      <p class="note"><strong>При несоблюдении условий выезд оплачивается отдельно:</strong></p>
      <ul>
        <li>До 50 км — <strong>3000 руб</strong></li>
        <li>50–75 км — <strong>4000 руб</strong></li>
        <li>75–125 км — <strong>5000 руб</strong></li>
      </ul>
      <p>Замер осуществляется в течение <span class="highlight">1–2 дней</span></p>
    `
  },
  {
    id: 2,
    question: 'Монтаж специалистами',
    answer: `
      <p><strong>Что входит в услугу монтажа:</strong></p>
      <ul>
        <li>Установка гибких окон из ПВХ</li>
        <li>Проверка конструкции</li>
        <li>Инструктаж по эксплуатации</li>
      </ul>
      <p class="note"><strong>Важная информация:</strong></p>
      <ul>
        <li>Минимальная сумма монтажа — <strong>15000 руб</strong></li>
        <li>Монтаж на кирпич/бетон/бревно — согласуется отдельно</li>
        <li>Доп. конструкции оплачиваются отдельно</li>
      </ul>
    `
  },
  {
    id: 3,
    question: 'Монтаж силами заказчика',
    answer: `
      <p class="warning"><strong>Вся ответственность за точность монтажа лежит на вас</strong></p>
      <p><strong>Советы по эксплуатации и уходу:</strong></p>
      <ul>
        <li>Диапазон температур: <span class="highlight">-30…+70°C</span></li>
        <li>При морозе — аккуратно демонтировать и хранить в тепле</li>
        <li>Резкие перепады температуры — материал переносит</li>
        <li>УФ-излучение — пленка теряет прозрачность до <strong>5%</strong> за несколько лет</li>
        <li>Рекомендуется регулярная чистка мягких окон</li>
      </ul>
      <p class="danger"><strong>Запрещенные средства для чистки:</strong></p>
      <ul>
        <li>Бензин, керосин, уайт-спирит</li>
        <li>Скипидар, толуол, спирт</li>
      </ul>
      <p class="warning"><strong>Не скручивать при температуре ниже 0°C</strong></p>
    `
  }
]

const toggleItem = (id: number) => {
  const index = openItems.value.indexOf(id)
  if (index === -1) {
    openItems.value.push(id)
  } else {
    openItems.value.splice(index, 1)
  }
}

const isOpen = (id: number) => openItems.value.includes(id)

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

  const section = document.getElementById('faq')
  if (section) observer.observe(section)
})
</script>

<template>
  <section class="faq section" id="faq">
    <div class="container">
      <div class="faq-wrapper">
        <div class="faq-header" :class="{ visible: isVisible }">
          <h2 class="section-title">Частые вопросы</h2>
          <p class="section-subtitle">
            Ответы на популярные вопросы о мягких окнах, замере и монтаже
          </p>
        </div>

        <div class="faq-list">
          <article
            v-for="(item, index) in faqItems"
            :key="item.id"
            class="faq-item"
            :class="{ open: isOpen(item.id), visible: isVisible }"
            :style="{ animationDelay: `${0.2 + index * 0.1}s` }"
          >
            <button
              class="faq-question"
              @click="toggleItem(item.id)"
              :aria-expanded="isOpen(item.id)"
              :aria-controls="`faq-answer-${item.id}`"
            >
              <span class="faq-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="faq-title">{{ item.question }}</span>
              <span class="faq-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </span>
            </button>
            
            <Transition name="accordion">
              <div
                v-if="isOpen(item.id)"
                :id="`faq-answer-${item.id}`"
                class="faq-answer"
              >
                <div class="faq-content" v-html="item.answer"></div>
              </div>
            </Transition>
          </article>
        </div>

        <!-- CTA -->
        <div class="faq-cta" :class="{ visible: isVisible }">
          <p>Не нашли ответ на свой вопрос?</p>
          <a href="#quiz" class="btn btn-primary">Задать вопрос</a>
        </div>
      </div>
    </div>

    <!-- Decorative -->
    <div class="faq-decor" aria-hidden="true">
      <div class="decor-shape"></div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.faq-wrapper {
  max-width: 90rem;
  margin: 0 auto;
}

.faq-header {
  text-align: center;
  margin-bottom: 5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.faq-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  margin-bottom: 2rem;
}

.section-subtitle {
  font-size: 1.8rem;
  color: var(--text-secondary);
}

/* FAQ List */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* FAQ Item */
.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateX(-30px);
}

.faq-item.visible {
  animation: fadeInLeft 0.6s ease forwards;
}

@keyframes fadeInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.faq-item:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
}

.faq-item.open {
  border-color: var(--accent);
  box-shadow: var(--shadow-lg), 0 0 30px var(--accent-glow);
}

/* Question Button */
.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem 3rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
}

.faq-question:hover {
  background: rgba(130, 219, 247, 0.05);
}

.faq-number {
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent);
  transition: all var(--transition-base);
}

.faq-item.open .faq-number {
  background: var(--gradient-primary);
  color: white;
}

.faq-title {
  flex: 1;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
}

.faq-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all var(--transition-base);
}

.faq-item.open .faq-icon {
  color: var(--accent);
  transform: rotate(45deg);
}

/* Answer */
.faq-answer {
  overflow: hidden;
}

.faq-content {
  padding: 0 3rem 3rem;
  padding-left: 9rem;
  font-size: 1.5rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.faq-content :deep(p) {
  margin-bottom: 1.5rem;
}

.faq-content :deep(ul) {
  margin: 1rem 0 1.5rem;
  padding-left: 2rem;
}

.faq-content :deep(li) {
  margin-bottom: 0.8rem;
  position: relative;
}

.faq-content :deep(li::marker) {
  color: var(--accent);
}

.faq-content :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.faq-content :deep(.highlight) {
  background: rgba(130, 219, 247, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 0.4rem;
  color: var(--accent);
  font-weight: 600;
}

.faq-content :deep(.note) {
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--accent);
  margin: 1.5rem 0;
}

.faq-content :deep(.warning) {
  padding: 1.5rem;
  background: rgba(245, 158, 11, 0.1);
  border-radius: var(--radius-sm);
  border-left: 3px solid #f59e0b;
  color: #b45309;
  margin: 1.5rem 0;
}

[data-theme="dark"] .faq-content :deep(.warning) {
  color: #fbbf24;
}

.faq-content :deep(.danger) {
  padding: 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius-sm);
  border-left: 3px solid #ef4444;
  color: #dc2626;
  margin: 1.5rem 0;
}

[data-theme="dark"] .faq-content :deep(.danger) {
  color: #f87171;
}

/* CTA */
.faq-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 5rem;
  padding: 4rem;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.4s;
}

.faq-cta.visible {
  opacity: 1;
  transform: translateY(0);
}

.faq-cta p {
  font-size: 1.8rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Decorative */
.faq-decor {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.decor-shape {
  position: absolute;
  top: 50%;
  right: -20%;
  width: 60rem;
  height: 60rem;
  background: var(--accent);
  border-radius: var(--radius-blob);
  opacity: 0.03;
  transform: translateY(-50%);
}

/* Accordion Transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 500px;
}

@media (max-width: 768px) {
  .faq-question {
    padding: 2rem;
    gap: 1.5rem;
  }

  .faq-content {
    padding: 0 2rem 2rem;
    padding-left: 2rem;
  }

  .faq-number {
    display: none;
  }
}
</style>
