<script setup lang="ts">
import { onMounted } from "vue";
import { useTaskStore } from "@/stores/task.store";
import TaskList from "@/components/task/TaskList.vue";

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">
        Task Management
      </h1>

      <div
        v-if="taskStore.loading"
        class="text-center"
      >
        Loading...
      </div>

      <div
        v-else-if="taskStore.error"
        class="text-red-500"
      >
        {{ taskStore.error }}
      </div>

      <TaskList
        v-else
        :tasks="taskStore.tasks"
      />
    </div>
  </div>
</template>