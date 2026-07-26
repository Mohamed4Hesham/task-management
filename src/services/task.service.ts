import type { Task } from "@/types/task";

const mockTasks: Task[] = [
  {
      id: crypto.randomUUID(),
      title: "Finish Vue assignment",
      description: "Complete the CRUD task manager",
      status: "pending",
      dueDate: "2026-07-30",
      createdAt: ""
  },
  {
    id: crypto.randomUUID(),
    title: "Study Pinia",
    description: "Understand stores and actions",
    status: "in-progress",
    dueDate: "2026-07-31",
        createdAt: ""

  },
  {
    id: crypto.randomUUID(),
    title: "Push project to GitHub",
    description: "Write README and submit",
    status: "done",
    dueDate: "2026-07-29",
        createdAt: ""

  },
];

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getTasks(): Promise<Task[]> {
  await delay(1000);

  return [...mockTasks];
}