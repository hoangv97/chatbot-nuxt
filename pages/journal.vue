<script setup lang="ts">
const getTemplate = () => {
  const hour = new Date().getHours();
  // const hour = 18;
  let hourTemplate = '';
  if (hour >= 0 && hour < 12) {
    hourTemplate = 'I am writing in the morning to start a new day. ';
  } else if (hour >= 12 && hour < 18) {
    hourTemplate = 'I am writing in the afternoon. ';
  } else {
    hourTemplate = 'I am writing at the end of the day to review my day. ';
  }
  return `Act as a personal assistant and ask me a question about my daily journal. ${hourTemplate}My journal is below:`;
};
</script>

<template>
  <Journal :prompt-template="getTemplate()" ask-when-start />
</template>
