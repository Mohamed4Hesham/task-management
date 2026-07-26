import { defineStore } from "pinia";
import { ref } from "vue";
import type { Task } from "@/types/task";
import { getTasks } from "@/services/task.service";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTasks() {
    loading.value = true;
    error.value = null;

    try {
      tasks.value = await getTasks();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Something went wrong";
    } finally {
      loading.value = false;
    }
  }

  function addTask(task: Task) {
    tasks.value.push(task);
  }

  function updateTask(updatedTask: Task) {
    const index = tasks.value.findIndex(
      (task) => task.id === updatedTask.id
    );

    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
});