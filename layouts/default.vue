<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
import FloatingContacts from "~/components/FloatingContacts.vue";
import DropIn from "~/components/Drop-in.vue";
import QuestionToast from "~/components/QuestionToast.vue";
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <FloatingContacts />
    <div class="toast-stack">
      <DropIn />
      <QuestionToast />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

.toast-stack {
  position: fixed;
  bottom: 2rem;
  left: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  z-index: 5;
}
</style>
