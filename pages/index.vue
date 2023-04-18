<script setup lang="ts">
const state = reactive<{ showChat: boolean }>({
  showChat: false,
});
</script>

<template>
  <div
    v-if="!state.showChat"
    class="w-full h-screen flex items-center justify-center"
  >
    <button
      type="button"
      class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-base px-6 py-3 text-center"
      @click="state.showChat = true"
    >
      Chat
    </button>
  </div>
  <div v-if="state.showChat"><Chat /></div>
</template>
