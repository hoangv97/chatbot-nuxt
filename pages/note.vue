<script setup lang="ts">
const getTemplate = () => {
  return `Ask me a question about my writings to help me write better. My writings is below:`;
};
</script>

<template>
  <Journal
    :prompt-template="getTemplate()"
    can-edit-template
    default-question="Hi! How can I help you today?"
  />
</template>
