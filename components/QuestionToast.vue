<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import { phoneValidator, getPhoneMaskItems } from "~/utils/phoneValidation";
import { formatPhoneNumber } from "~/utils/phoneFormatting";
import PhoneMaskTooltip from "./PhoneMaskTooltip.vue";
import type { EmailResponse } from "~/types";

const isVisible = ref(false);
const isClosed = ref(false);
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const submitError = ref("");

const phoneMaskItems = getPhoneMaskItems();

const TARGET_ID = "materials";

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required("Введите имя"),
    phone: phoneValidator.required("Введите телефон"),
  }),
  initialValues: {
    name: "",
    phone: "",
  },
  validateOnMount: false,
});

const onSubmit = handleSubmit(async (values) => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  submitError.value = "";

  try {
    const response = await $fetch<EmailResponse>("/api/question", {
      method: "POST",
      body: {
        type: "question",
        data: {
          name: values.name.trim(),
          phone: values.phone.trim(),
        },
      },
    });

    if (response?.success) {
      isSubmitted.value = true;
    } else {
      submitError.value = response?.message || "Ошибка отправки";
    }
  } catch (e) {
    submitError.value = "Ошибка сервера";
    console.error("send error", e);
  } finally {
    isSubmitting.value = false;
  }
});

let observer: IntersectionObserver;

const initObserver = () => {
  const el = document.getElementById(TARGET_ID);
  if (!el) return;

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isClosed.value) {
        isVisible.value = true;
      }
    },
    { threshold: 0.3 },
  );

  observer.observe(el);
};

const close = () => {
  isClosed.value = true;
  isVisible.value = false;
};

const onPhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const formatted = formatPhoneNumber(target.value);

  setFieldValue("phone", formatted);
};

const onPhoneKeyDown = (e: KeyboardEvent) => {
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "Tab" &&
    e.key !== "Home" &&
    e.key !== "End"
  ) {
    e.preventDefault();
  }
};

onMounted(() => {
  initObserver();
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <Transition name="toast">
    <div v-if="isVisible" class="toast question-toast">
      <button
        class="close-btn"
        type="button"
        @click="close"
        aria-label="Закрыть"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          stroke-width="2"
        >
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>

      <div class="content">
        <Transition name="fade" mode="out-in">
          <!-- SUCCESS -->
          <div v-if="isSubmitted" class="success">
            <div class="success-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <div class="title">Заявка отправлена!</div>

            <div class="desc">Мы свяжемся с вами в ближайшее время</div>

            <p v-if="submitError" class="submit-error">
              {{ submitError }}
            </p>
          </div>

          <!-- FORM -->
          <div v-else>
            <div class="title">Есть вопросы?</div>

            <div class="desc">
              Оставьте заявку — мы перезвоним и ответим на все ваши вопросы.
            </div>

            <form class="form" @submit.prevent="onSubmit">
              <div class="field">
                <Field
                  name="name"
                  as="input"
                  type="text"
                  placeholder="Ваше имя"
                  class="input"
                />
                <ErrorMessage name="name" class="error" />
              </div>

              <div class="field">
                <Field
                  name="phone"
                  as="input"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  class="input"
                  @input="onPhoneInput"
                  @keydown="onPhoneKeyDown"
                />

                <PhoneMaskTooltip v-if="errors.phone" :items="phoneMaskItems">
                  <div class="error-wrap">
                    <Icon
                      name="material-symbols:help-outline"
                      class="error-icon"
                    />
                    <ErrorMessage name="phone" class="error" />
                  </div>
                </PhoneMaskTooltip>
              </div>

              <p v-if="submitError" class="submit-error">
                {{ submitError }}
              </p>

              <button
                class="btn btn-primary submit"
                type="submit"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Отправка...</span>
                <span v-else>Отправить</span>
              </button>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  width: clamp(260px, 80vw, 442px);
  max-width: calc(100% - 4rem);

  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);

  color: var(--text-primary);
  overflow: visible;
  z-index: 10;
}

.question-toast {
  left: 2rem;
}

.content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.desc {
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.input {
  width: 100%;
  padding: 1.4rem 1.8rem;
  font-size: 1.6rem;
  font-family: inherit;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 15px var(--accent-glow);
}

.input::placeholder {
  color: var(--text-muted);
}

.error {
  font-size: 1.2rem;
  line-height: 1.3;
  color: #ff7b7b;
}

.error-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.error-icon {
  width: 1.6rem;
  height: 1.6rem;

  color: #ff7b7b;
  cursor: help;
  flex-shrink: 0;

  transition: all 0.2s ease;
}

.submit {
  width: 100%;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  width: 3rem;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 50%;

  cursor: pointer;
}

.success {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  width: 8rem;
  height: 8rem;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(130, 219, 247, 0.1);
  border-radius: 50%;
  color: var(--accent);
}

.success .title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.success .desc {
  font-size: 1.4rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
