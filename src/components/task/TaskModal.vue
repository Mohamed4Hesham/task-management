<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
      <slot />
    </div>
  </div>
</template>