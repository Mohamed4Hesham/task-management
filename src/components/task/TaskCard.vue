<script setup lang="ts">
import type { Task } from "@/types/task";

defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "edit", task: Task): void;
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <div class="rounded-lg bg-white shadow border p-5">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-semibold">
        {{ task.title }}
      </h2>

      <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
        {{ task.status }}
      </span>
    </div>

    <p class="text-gray-600 mb-3">
      {{ task.description }}
    </p>

    <p class="text-sm text-gray-500">
      Due: {{ task.dueDate }}
    </p>

<button
  @click="emit('edit', task)"
  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  Edit
</button>

<button
  @click="emit('delete', task.id)"
  class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
>
  Delete
</button>
  </div>
</template>