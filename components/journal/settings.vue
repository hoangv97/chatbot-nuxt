<script setup lang="ts">
const JOURNAL_APP_SETTINGS_KEY = 'JOURNAL_APP_SETTINGS';

const { title, content, template } = defineProps<{
  title: string;
  content: string;
  template: string;
}>();

const emit = defineEmits<{
  (e: 'closed'): void;
  (e: 'changeTemplate', template: string): void;
}>();

const state = reactive({
  apiKey: '',
  aiTemplate: template,
  notionApiKey: '',
  notionDatabaseId: '',
});

const loading = ref(false);

const start = () => {
  const settings = localStorage.getItem(JOURNAL_APP_SETTINGS_KEY);
  if (settings) {
    Object.assign(state, JSON.parse(settings));
  }
};

start();

watch(state, (value) => {
  localStorage.setItem(JOURNAL_APP_SETTINGS_KEY, JSON.stringify(value));
});

const saveToNotion = async () => {
  loading.value = true;
  const { data: resData } = await useFetch(`/api/journal`, {
    method: 'POST',
    body: JSON.stringify({
      title: title.trim(),
      content: content.trim(),
      apiKey: state.notionApiKey,
      databaseId: state.notionDatabaseId,
    }),
  });
  loading.value = false;
  // console.log('resData', resData);
  alert(resData.value?.message);
};
</script>
<template>
  <CommonModal @close="emit('closed')">
    <div class="flex flex-col items-start gap-2">
      <h6 class="text-lg font-bold dark:text-white">AI</h6>

      <input
        type="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="API Key"
        :value="state.apiKey"
        @change="
          ($event) => {
            state.apiKey = $event.target.value.trim();
          }
        "
      />

      <!-- <textarea
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        rows="5"
        :value="state.aiTemplate"
        @change="
          ($event) => {
            const value = $event.target.value.trim();
            state.aiTemplate = value;
            emit('changeTemplate', value);
          }
        "
      ></textarea> -->

      <h6 class="text-lg font-bold dark:text-white">Notion</h6>

      <input
        type="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Notion API Key"
        :value="state.notionApiKey"
        @change="
          ($event) => {
            state.notionApiKey = $event.target.value.trim();
          }
        "
      />

      <input
        type="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Notion Database ID"
        :value="state.notionDatabaseId"
        @change="
          ($event) => {
            state.notionDatabaseId = $event.target.value.trim();
          }
        "
      />

      <button
        type="button"
        class="px-7 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
        @click="saveToNotion"
        :disabled="
          !state.notionApiKey || !state.notionDatabaseId || !content || loading
        "
      >
        Save to Notion
      </button>
    </div>
  </CommonModal>
</template>
