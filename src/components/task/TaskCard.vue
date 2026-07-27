<script setup lang="ts">
import type { Task } from "@/types/task";
import Button from 'primevue/button';


defineProps<{
  task: Task;
}>();

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const emit = defineEmits<{
  (e: "edit", task: Task): void;
  (e: "delete", id: string): void;
}>();

const statusClasses = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
};
</script>

<template>
  <div class="rounded-lg bg-white border border-gray-400 p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
    
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-semibold">
        {{ task.title }}
      </h2>

<span
  class="px-4 py-1 rounded-sm text-xs font-semibold"
  :class="statusClasses[task.status]"
>
  {{
    task.status === "pending"
      ? "Pending"
      : task.status === "in-progress"
      ? "In Progress"
      : "Done"
  }}
</span>
    </div>

    <p class="text-gray-600 leading-6 mt-2 mb-4">
      {{ task.description }}
    </p>

    <p class="text-sm text-gray-500 flex items-center">
      <i class="pi pi-calendar mr-1"></i>

      Due:   {{ formatDate(task.dueDate) }}
    </p>

    <div class="flex justify-end gap-2 mt-4">


      <Button severity="contrast" type="submit" variant="outlined" class="px-4 py-2 rounded-lg border text-center"
        @click="emit('edit', task)">
        <i class="pi pi-pencil"></i>

        Edit</Button>

      <Button severity="danger" class="px-8 py-2 rounded-lg border text-center" @click="emit('delete', task.id)">
        <i class="pi pi-trash"></i>
        Delete</Button>
    </div>
  </div>
</template>