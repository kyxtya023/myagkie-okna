<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
import FloatingContacts from "~/components/FloatingContacts.vue";
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <FloatingContacts />
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
</style>
