// src/utils/sortTasks.ts
import type { Task } from "../types/task";

// Sort by status: TODO -> IN_PROGRESS -> DONE
export const sortTasksByStatus = (tasks: Task[]): Task[] => {
  const order = { TODO: 0, IN_PROGRESS: 1, DONE: 2 };
  return [...tasks].sort((a, b) => order[a.status] - order[b.status]);
};

// Sort by newest first
export const sortTasksByDate = (tasks: Task[]): Task[] => {
  return [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
