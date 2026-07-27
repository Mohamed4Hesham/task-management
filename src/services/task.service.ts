import type { Task } from "@/types/task";

const mockTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Schedule Annual Health Checkup",
    description: "Book an appointment with the family doctor for a routine checkup.",
    status: "pending",
    dueDate: "2026-08-03",
    createdAt: "2026-07-25",
  },
  {
    id: crypto.randomUUID(),
    title: "Read a New Book",
    description: "Finish reading at least five chapters before the end of the week.",
    status: "in-progress",
    dueDate: "2026-08-04",
    createdAt: "2026-07-23",
  },
  {
    id: crypto.randomUUID(),
    title: "Pay Utility Bills",
    description: "Pay electricity, internet, and water bills before the due date.",
    status: "done",
    dueDate: "2026-07-28",
    createdAt: "2026-07-20",
  },

];
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getTasks(): Promise<Task[]> {
  await delay(1000);

  return [...mockTasks];
}