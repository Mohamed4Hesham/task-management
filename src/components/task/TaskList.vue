<script setup lang="ts">
import type { Task } from "@/types/task";
import TaskCard from "./TaskCard.vue";

defineProps<{
  tasks: Task[];
}>();
</script>

<template>
  <div class="space-y-4">
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>