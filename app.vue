<script setup lang="ts">
useHead({
  title: 'Talking AI',
  meta: [{ name: 'description', content: 'Talking AI.' }],
  bodyAttrs: {
    class: 'bg-white dark:bg-gray-900',
  },
  script: [{ innerHTML: '' }],
});
</script>

<template>
  <div class="px-5 text-gray-900 dark:text-white">
    <NuxtPage />
  </div>
</template>
