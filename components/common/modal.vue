<script setup lang="ts">
const { title } = defineProps<{ title?: string }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};
</script>

<template>
  <div
    class="modal fixed inset-0 z-50 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <div class="modal-overlay absolute inset-0" @click="close"></div>
    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto dark:bg-gray-600"
    >
      <div class="modal-content py-4 text-left px-4 max-h-screen">
        <h3 v-if="title" class="text-lg leading-6 font-medium mb-5">
          {{ title }}
        </h3>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
