<script setup lang="ts">
const getTemplate = () => {
  return `Act as a personal assistant and ask me a question about my writings to help me write better. My writings is below:`;
};
</script>

<template>
  <Journal :prompt-template="getTemplate()" />
</template>
