<script setup lang="ts">
import { ref } from "vue";
import type { PhoneMaskItem } from "~/utils/phoneValidation";

defineProps<{
  items: PhoneMaskItem[];
  text?: string;
}>();

const isOpen = ref(false);

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};
</script>

<template>
  <span class="wrap" @mouseenter="open" @mouseleave="close">
    <span class="trigger">
      <slot />
    </span>

    <Transition name="fade">
      <div v-if="isOpen" class="tooltip" role="tooltip">
        <div class="title">
          {{ text || "Допустимые форматы номера" }}
        </div>

        <div class="list">
          <div v-for="item in items" :key="item.code" class="row">
            <span class="name">{{ item.name }}</span>
            <span class="mask">{{ item.mask }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </span>
</template>

<style scoped>
.wrap {
  position: relative;
  display: inline-block;
  max-width: 100%;
  padding-bottom: 0.6rem;
}

.trigger {
  display: inline-flex;
  cursor: help;
}

.tooltip {
  position: absolute;
  left: 0;
  bottom: 100%;
  width: min(34rem, 80vw);
  max-width: 34rem;
  height: 14rem;
  padding: 1rem 1.2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 8;
  overflow-y: auto;
  pointer-events: auto;
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1.2rem;
}

.name {
  color: var(--text-secondary);
  white-space: nowrap;
}

.mask {
  color: var(--text-primary);
  font-family: monospace;
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
