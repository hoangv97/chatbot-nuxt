<script setup lang="ts">
const SYSTEM_MESSAGES_STATE_KEY = 'CHAT_APP_SYSTEM_MESSAGES';

const emit = defineEmits<{
  (e: 'closed'): void;
  (e: 'selected', msg: string): void;
}>();

const state = reactive<{ messages: string[] }>({
  messages: JSON.parse(localStorage.getItem(SYSTEM_MESSAGES_STATE_KEY) || '[]'),
});

watch(state, (value) => {
  localStorage.setItem(
    SYSTEM_MESSAGES_STATE_KEY,
    JSON.stringify(value.messages)
  );
});

const newMessage = () => {
  state.messages.push('');
};

const selectMessage = (message: string) => {
  emit('selected', message);
};

const deleteMessage = (i: number) => {
  if (confirm('Are you sure you want to delete this message?')) {
    state.messages.splice(i, 1);
  }
};
</script>
<template>
  <CommonModal title="System Messages" @close="emit('closed')">
    <div class="flex flex-col items-center gap-3">
      <div
        class="w-full flex items-center gap-1"
        v-for="(message, i) in state.messages"
        :key="i"
      >
        <textarea
          rows="3"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="System message..."
          :value="message"
          @change="($event) => (state.messages[i] = $event.target.value)"
        ></textarea>
        <div class="flex flex-col gap-1">
          <button
            type="button"
            class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="($event) => selectMessage(message)"
          >
            <svg
              class="w-4 h-4"
              data-darkreader-inline-stroke=""
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            @click="($event) => deleteMessage(i)"
          >
            <svg
              class="w-4 h-4"
              data-darkreader-inline-stroke=""
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <button
        type="button"
        class="px-7 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        @click="newMessage"
      >
        New
      </button>
    </div>
  </CommonModal>
</template>
