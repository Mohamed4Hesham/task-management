<template>
  <div class="min-h-screen bg-gray-100 p-8">

    <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between">
                  <h1 class="text-3xl font-bold mb-8">
        Task Management
      </h1>

            
  <button
    @click="openCreateModal"
    class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
  >
    + Add Task
  </button>
        </div>

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
          @edit="openEditModal"
  @delete="handleDelete"
      />
    </div>
  </div>
  <TaskModal v-if="isModalOpen" :show="isModalOpen" :onClose="closeModal">
    <TaskForm
        :task="editingTask"
        @submit="handleSubmit"
        @cancel="closeModal"
    />
</TaskModal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/task.store";
import TaskList from "@/components/task/TaskList.vue";
import type { Task } from "@/types/task";
import TaskModal from "@/components/task/TaskModal.vue";
import TaskForm from "@/components/task/TaskForm.vue";


const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});

const isModalOpen = ref(false)
const editingTask = ref<Task | null>(null)

function openCreateModal() {
  editingTask.value = null
  isModalOpen.value = true
}

function openEditModal(task: Task) {
  editingTask.value = task
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}
function handleSubmit(task: Task) {
  if (editingTask.value) {
    taskStore.updateTask(task);
  } else {
    taskStore.addTask(task);
  }

  closeModal();
}
function handleDelete(id: string) {
  taskStore.deleteTask(id);
}


</script>