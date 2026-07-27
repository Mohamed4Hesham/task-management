<script setup lang="ts">
import type { Task } from "@/types/task";
import TaskCard from "./TaskCard.vue";

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  (e: "edit", task: Task): void;
  (e: "delete", id: string): void;
}>();
</script>

<template>

  <div class="space-y-4">
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" @edit="emit('edit', $event)"
      @delete="emit('delete', $event)" />
  </div>
</template>