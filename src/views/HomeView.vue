<template>
  <div class="min-h-screen bg-gray-100 p-8">

    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-1">
            Task Management
          </h1>
          <h6 class="text-base mb-8">
            Manage your tasks efficiently and stay organized.
          </h6>
        </div>


        <div>
          <Button severity="contrast" @click="openCreateModal" class="px-4 py-2 rounded-lg ">
            + Add Task</Button>
        </div>

      </div>

      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <InputText v-model="searchQuery" placeholder="Search by title..." class="flex-1" />

        <Select v-model="selectedStatus" :options="statusOptions" optionLabel="label" optionValue="value"
          class="w-56" />
      </div>

      <div v-if="taskStore.loading" class="text-center">
        Loading...
      </div>

      <div v-else-if="taskStore.error" class="text-red-500">
        {{ taskStore.error }}
      </div>



      <div v-else class="space-y-8">

        <section>
          <h6 class="mb-4 text-md font-semibold ">
            Pending ({{ pendingTasks.length }})
          </h6>

          <TaskList :tasks="pendingTasks" @edit="openEditModal" @delete="handleDelete" />
        </section>

        <section>
          <h6 class="mb-4 text-md font-semibold ">
            In Progress ({{ inProgressTasks.length }})
          </h6>

          <TaskList :tasks="inProgressTasks" @edit="openEditModal" @delete="handleDelete" />
        </section>

        <section>

          <h6 class="mb-4 text-md font-semibold ">
            Done ({{ doneTasks.length }})
          </h6>
          <TaskList :tasks="doneTasks" @edit="openEditModal" @delete="handleDelete" />
        </section>

      </div>
    </div>
  </div>
  <TaskModal v-if="isModalOpen" :show="isModalOpen" :onClose="closeModal">
    <TaskForm :task="editingTask" @submit="handleSubmit" @cancel="closeModal" />
  </TaskModal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/task.store";
import TaskList from "@/components/task/TaskList.vue";
import type { Task } from "@/types/task";
import TaskModal from "@/components/task/TaskModal.vue";
import TaskForm from "@/components/task/TaskForm.vue";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';




const taskStore = useTaskStore();
const searchQuery = ref("");
const selectedStatus = ref("all");
const isModalOpen = ref(false)
const editingTask = ref<Task | null>(null)
const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

const filteredTasks = computed(() => {
  return taskStore.tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      selectedStatus.value === "all" ||
      task.status === selectedStatus.value;

    return matchesSearch && matchesStatus;
  });
});

const pendingTasks = computed(() =>
  filteredTasks.value.filter(task => task.status === "pending")
);

const inProgressTasks = computed(() =>
  filteredTasks.value.filter(task => task.status === "in-progress")
);

const doneTasks = computed(() =>
  filteredTasks.value.filter(task => task.status === "done")
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

onMounted(() => {
  taskStore.fetchTasks();
});


</script>