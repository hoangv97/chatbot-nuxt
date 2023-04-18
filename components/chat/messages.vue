<script setup lang="ts">
interface MessageProps {
  role: string;
  content: string;
}

const { messages } = defineProps<{
  messages: MessageProps[];
}>();
</script>

<template>
  <div class="mt-5 mb-28 flex flex-col gap-2">
    <div
      v-for="(message, i) in messages"
      :key="i"
      class="flex"
      :class="{
        'justify-end': message.role === 'user',
        'justify-start': ['assistant', 'system'].includes(message.role),
      }"
    >
      <div
        class="rounded-lg p-2.5 text-sm text-gray-900 dark:text-white"
        :class="{
          'bg-blue-400 dark:bg-blue-700 text-gray-900 dark:text-white':
            message.role === 'user',
          'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white':
            message.role === 'assistant',
          'bg-orange-50 dark:bg-orange-700 text-orange-900 dark:text-orange':
            message.role === 'system',
        }"
        v-html="message.content.replaceAll('\n', '</br>')"
      ></div>
    </div>
  </div>
</template>
