<script setup lang="ts"></script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center gap-4">
    <NuxtLink to="/chat">
      <button
        type="button"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-6 py-3 text-center"
      >
        Chat
      </button>
    </NuxtLink>
    <NuxtLink to="/journal">
      <button
        type="button"
        class="text-white bg-gradient-to-br from-green-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-6 py-3 text-center"
      >
        Journal
      </button>
    </NuxtLink>
  </div>
</template>
