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

<div v-else class="space-y-8">

  <section>
    <h2 class="mb-4 text-xl font-semibold text-yellow-600">
      🟡 Pending ({{ pendingTasks.length }})
    </h2>

    <TaskList
      :tasks="pendingTasks"
      @edit="openEditModal"
      @delete="handleDelete"
    />
  </section>

  <section>
    <h2 class="mb-4 text-xl font-semibold text-blue-600">
      🔵 In Progress ({{ inProgressTasks.length }})
    </h2>

    <TaskList
      :tasks="inProgressTasks"
      @edit="openEditModal"
      @delete="handleDelete"
    />
  </section>

  <section>
    <h2 class="mb-4 text-xl font-semibold text-green-600">
      🟢 Done ({{ doneTasks.length }})
    </h2>

    <TaskList
      :tasks="doneTasks"
      @edit="openEditModal"
      @delete="handleDelete"
    />
  </section>

</div>
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
import { computed, onMounted, ref } from "vue";
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

    const pendingTasks = computed(() =>
  taskStore.tasks.filter(task => task.status === "pending")
);

const inProgressTasks = computed(() =>
  taskStore.tasks.filter(task => task.status === "in-progress")
);

const doneTasks = computed(() =>
  taskStore.tasks.filter(task => task.status === "done")
);

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