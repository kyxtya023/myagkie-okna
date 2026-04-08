<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { QuizStep, QuizAnswers } from '~/types'

const isVisible = ref(false)
const currentStep = ref(1)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref('')

const totalSteps = 7

const answers = ref<QuizAnswers>({
  area: '',
  doors: '',
  base: '',
  package: '',
  installation: '',
  timing: '',
  name: '',
  phone: '',
  comment: ''
})

const steps: QuizStep[] = [
  {
    id: 1,
    question: 'Какая площадь мягкого остекления?',
    type: 'select',
    options: [
      { value: 'до 10', label: 'До 10 м²', description: 'Небольшая беседка или балкон' },
      { value: '10-20', label: '10–20 м²', description: 'Средняя веранда' },
      { value: '20-40', label: '20–40 м²', description: 'Большая терраса' },
      { value: 'более 40', label: 'Более 40 м²', description: 'Крупный объект' },
      { value: 'не знаю', label: 'Не знаю', description: 'Нужен замер' }
    ]
  },
  {
    id: 2,
    question: 'Сколько дверных проемов?',
    type: 'select',
    options: [
      { value: '0', label: 'Нет проемов' },
      { value: '1', label: '1 проем' },
      { value: '2', label: '2 проема' },
      { value: '3+', label: '3 и более' }
    ]
  },
  {
    id: 3,
    question: 'Основание для монтажа',
    type: 'select',
    options: [
      { value: 'дерево', label: 'Дерево', description: 'Деревянный каркас' },
      { value: 'металл', label: 'Металл', description: 'Металлический каркас' },
      { value: 'кирпич', label: 'Кирпич/бетон', description: 'Каменные стены' },
      { value: 'другое', label: 'Другое', description: 'Уточню позже' }
    ]
  },
  {
    id: 4,
    question: 'Какой комплект вас интересует?',
    type: 'select',
    options: [
      { value: 'эконом', label: 'Эконом', description: 'Пленка на отрез от 1200 руб/м²' },
      { value: 'самомонтаж', label: 'Самомонтаж', description: 'Готовый комплект от 1800 руб/м²' },
      { value: 'под ключ', label: 'Под ключ', description: 'С установкой от 2500 руб/м²' },
      { value: 'не определился', label: 'Не определился', description: 'Нужна консультация' }
    ]
  },
  {
    id: 5,
    question: 'Нужен ли монтаж?',
    type: 'radio',
    options: [
      { value: 'сам', label: 'Установлю сам' },
      { value: 'требуется', label: 'Да, нужен монтаж' },
      { value: 'консультация', label: 'Нужна консультация' }
    ]
  },
  {
    id: 6,
    question: 'Когда планируете установку?',
    type: 'select',
    options: [
      { value: 'срочно', label: 'Срочно', description: 'В ближайшие дни' },
      { value: '1-2 недели', label: '1-2 недели' },
      { value: 'месяц', label: 'В течение месяца' },
      { value: 'не определился', label: 'Пока не знаю' }
    ]
  },
  {
    id: 7,
    question: 'Оставьте контакты для связи',
    type: 'contact'
  }
]

const currentStepData = computed(() => steps[currentStep.value - 1])

const progress = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100)

const canProceed = computed(() => {
  const step = currentStepData.value
  if (step.type === 'contact') {
    return answers.value.name.trim() !== '' && answers.value.phone.trim() !== ''
  }
  const fieldMap: Record<number, keyof QuizAnswers> = {
    1: 'area',
    2: 'doors',
    3: 'base',
    4: 'package',
    5: 'installation',
    6: 'timing'
  }
  const field = fieldMap[step.id]
  return field ? answers.value[field] !== '' : true
})

const selectOption = (value: string) => {
  const fieldMap: Record<number, keyof QuizAnswers> = {
    1: 'area',
    2: 'doors',
    3: 'base',
    4: 'package',
    5: 'installation',
    6: 'timing'
  }
  const field = fieldMap[currentStep.value]
  if (field) {
    answers.value[field] = value
  }
}

const getSelectedValue = () => {
  const fieldMap: Record<number, keyof QuizAnswers> = {
    1: 'area',
    2: 'doors',
    3: 'base',
    4: 'package',
    5: 'installation',
    6: 'timing'
  }
  const field = fieldMap[currentStep.value]
  return field ? answers.value[field] : ''
}

const nextStep = () => {
  if (currentStep.value < totalSteps && canProceed.value) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitQuiz = async () => {
  if (!canProceed.value || isSubmitting.value) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        type: 'quiz',
        data: answers.value
      }
    })

    if (response.success) {
      isSubmitted.value = true
    } else {
      submitError.value = response.message || 'Произошла ошибка при отправке'
    }
  } catch (error) {
    submitError.value = 'Не удалось отправить заявку. Попробуйте позже.'
  } finally {
    isSubmitting.value = false
  }
}

const resetQuiz = () => {
  currentStep.value = 1
  isSubmitted.value = false
  submitError.value = ''
  answers.value = {
    area: '',
    doors: '',
    base: '',
    package: '',
    installation: '',
    timing: '',
    name: '',
    phone: '',
    comment: ''
  }
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

  const section = document.getElementById('quiz')
  if (section) observer.observe(section)
})
</script>

<template>
  <section class="quiz section" id="quiz">
    <div class="container">
      <div class="quiz-wrapper" :class="{ visible: isVisible }">
        <!-- Success State -->
        <Transition name="fade" mode="out-in">
          <div v-if="isSubmitted" class="quiz-success">
            <div class="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в ближайшее время для уточнения деталей</p>
            <button class="btn btn-secondary" @click="resetQuiz">Отправить ещё</button>
          </div>

          <!-- Quiz Form -->
          <div v-else class="quiz-content">
            <!-- Header -->
            <div class="quiz-header">
              <h2 class="quiz-title">Рассчитайте стоимость</h2>
              <p class="quiz-subtitle">Ответьте на несколько вопросов и получите точный расчёт</p>
            </div>

            <!-- Progress -->
            <div class="quiz-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
              </div>
              <span class="progress-text">Шаг {{ currentStep }} из {{ totalSteps }}</span>
            </div>

            <!-- Step Content -->
            <Transition name="slide" mode="out-in">
              <div :key="currentStep" class="quiz-step">
                <h3 class="step-question">{{ currentStepData.question }}</h3>

                <!-- Options -->
                <div v-if="currentStepData.type === 'select' || currentStepData.type === 'radio'" class="step-options">
                  <button
                    v-for="option in currentStepData.options"
                    :key="option.value"
                    class="option-card"
                    :class="{ selected: getSelectedValue() === option.value }"
                    @click="selectOption(option.value)"
                  >
                    <span class="option-radio">
                      <span class="radio-dot"></span>
                    </span>
                    <div class="option-content">
                      <span class="option-label">{{ option.label }}</span>
                      <span v-if="option.description" class="option-description">{{ option.description }}</span>
                    </div>
                  </button>
                </div>

                <!-- Contact Form -->
                <div v-if="currentStepData.type === 'contact'" class="step-contact">
                  <div class="form-group">
                    <label for="quiz-name">Ваше имя *</label>
                    <input
                      id="quiz-name"
                      v-model="answers.name"
                      type="text"
                      placeholder="Введите имя"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="quiz-phone">Телефон *</label>
                    <input
                      id="quiz-phone"
                      v-model="answers.phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="quiz-comment">Комментарий</label>
                    <textarea
                      id="quiz-comment"
                      v-model="answers.comment"
                      placeholder="Дополнительная информация..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <!-- Error -->
                <p v-if="submitError" class="submit-error">{{ submitError }}</p>
              </div>
            </Transition>

            <!-- Navigation -->
            <div class="quiz-nav">
              <button
                v-if="currentStep > 1"
                class="btn btn-secondary"
                @click="prevStep"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Назад
              </button>
              <div v-else></div>

              <button
                v-if="currentStep < totalSteps"
                class="btn btn-primary"
                :disabled="!canProceed"
                @click="nextStep"
              >
                Далее
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
              <button
                v-else
                class="btn btn-primary"
                :disabled="!canProceed || isSubmitting"
                @click="submitQuiz"
              >
                <span v-if="isSubmitting">Отправка...</span>
                <span v-else>Отправить заявку</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Decorative -->
    <div class="quiz-decor" aria-hidden="true">
      <div class="decor-circle decor-circle-1"></div>
      <div class="decor-circle decor-circle-2"></div>
    </div>
  </section>
</template>

<style scoped>
.quiz {
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
}

.quiz-wrapper {
  max-width: 70rem;
  margin: 0 auto;
  padding: 5rem;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.quiz-wrapper.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .quiz-wrapper {
    padding: 3rem 2rem;
  }
}

/* Header */
.quiz-header {
  text-align: center;
  margin-bottom: 3rem;
}

.quiz-title {
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  margin-bottom: 1rem;
}

.quiz-subtitle {
  font-size: 1.6rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Progress */
.quiz-progress {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.progress-bar {
  flex: 1;
  height: 0.8rem;
  background: var(--bg-tertiary);
  border-radius: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 1rem;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

/* Step */
.quiz-step {
  min-height: 30rem;
}

.step-question {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 3rem;
  text-align: center;
}

/* Options */
.step-options {
  display: grid;
  gap: 1.5rem;
}

.option-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
}

.option-card:hover {
  border-color: var(--accent);
  background: rgba(130, 219, 247, 0.05);
}

.option-card.selected {
  border-color: var(--accent);
  background: rgba(130, 219, 247, 0.1);
  box-shadow: 0 0 20px var(--accent-glow);
}

.option-radio {
  flex-shrink: 0;
  width: 2.4rem;
  height: 2.4rem;
  border: 2px solid var(--border-medium);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.option-card.selected .option-radio {
  border-color: var(--accent);
}

.radio-dot {
  width: 1.2rem;
  height: 1.2rem;
  background: var(--accent);
  border-radius: 50%;
  transform: scale(0);
  transition: transform var(--transition-fast);
}

.option-card.selected .radio-dot {
  transform: scale(1);
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.option-label {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-primary);
}

.option-description {
  font-size: 1.4rem;
  color: var(--text-muted);
}

/* Contact Form */
.step-contact {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.form-group label {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-group input,
.form-group textarea {
  padding: 1.4rem 1.8rem;
  font-size: 1.6rem;
  font-family: inherit;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 15px var(--accent-glow);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-muted);
}

.form-group textarea {
  resize: vertical;
  min-height: 10rem;
}

.submit-error {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius-sm);
  color: #ef4444;
  font-size: 1.4rem;
  text-align: center;
}

/* Navigation */
.quiz-nav {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-light);
}

.quiz-nav .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Success */
.quiz-success {
  text-align: center;
  padding: 4rem 2rem;
}

.success-icon {
  width: 10rem;
  height: 10rem;
  margin: 0 auto 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(130, 219, 247, 0.1);
  border-radius: 50%;
  color: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}

.quiz-success h3 {
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.quiz-success p {
  font-size: 1.6rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

/* Decorative */
.quiz-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.decor-circle {
  position: absolute;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.05;
}

.decor-circle-1 {
  width: 40rem;
  height: 40rem;
  top: -15rem;
  left: -10rem;
}

.decor-circle-2 {
  width: 50rem;
  height: 50rem;
  bottom: -20rem;
  right: -15rem;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
