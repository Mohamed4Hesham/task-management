<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block mb-1 font-medium">Title</label>

      <InputText v-model="title" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="Write a title" />
      <p v-if="errors.title" class="text-red-500 text-sm mt-1">
        {{ errors.title }}
      </p>
    </div>

    <div>
      <label class="block mb-1 font-medium">Description</label>

      <Textarea v-model="description" rows="4" class="w-full border rounded-lg px-3 py-2"
        placeholder="Write a description" />

    </div>

    <div>
      <label class="block mb-1 font-medium">Status</label>

      <Select v-model="status" :options="statuses" optionLabel="label" optionValue="value"
        placeholder="Choose a status" class="w-full" />

    </div>

    <div>
      <label class="block mb-1 font-medium">Due Date</label>

      <DatePicker v-model="dueDate" class="w-full" />


      <p v-if="errors.dueDate" class="text-red-500 text-sm mt-1">
        {{ errors.dueDate }}
      </p>
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <Button severity="secondary" @click="$emit('cancel')" class="px-4 py-2 rounded-lg border">Cancel</Button>


      <Button severity="contrast" type="submit" class="px-4 py-2 rounded-lg border">
        {{ props.task ? "Update Task" : "Add Task" }}</Button>


    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Task, TaskStatus } from "@/types/task";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';

const statuses = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];


interface Props {
  task?: Task | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "submit", task: Task): void;
  (e: "cancel"): void;
}>();

const title = ref(props.task?.title ?? "");
const description = ref(props.task?.description ?? "");
const status = ref<TaskStatus>(props.task?.status ?? "pending");
const dueDate = ref<Date | null>(
  props.task?.dueDate ? new Date(props.task.dueDate) : null
);
const errors = ref({
  title: "",
  dueDate: "",
});

function validate() {
  errors.value.title = "";
  errors.value.dueDate = "";

  if (!title.value.trim()) {
    errors.value.title = "Title is required";
  }

  if (!dueDate.value) {
    errors.value.dueDate = "Due date is required";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(dueDate.value);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      errors.value.dueDate = "Due date must be in the future";
    }
  }

  return !errors.value.title && !errors.value.dueDate;
}

watch(title, (value) => {
  if (value.trim()) {
    errors.value.title = "";
  }
});

watch(dueDate, (value) => {
  if (!value) {
    errors.value.dueDate = "";
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(value);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    errors.value.dueDate = "";
  }
});

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function handleSubmit() {
  if (!validate()) return;

emit("submit", {
  id: props.task?.id ?? crypto.randomUUID(),
  title: title.value,
  description: description.value,
  status: status.value,
  dueDate: formatDate(dueDate.value!),
});

}
</script>
