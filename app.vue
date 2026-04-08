<script setup lang="ts">
// App entry point
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Мягкие Окна` : 'Мягкие Окна из ПВХ — производство и монтаж'
  }
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
