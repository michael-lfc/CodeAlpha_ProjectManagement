// src/types/task.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: number;
  title: string;
  description?: string;
  projectId: number;
  assignedTo?: User | null;
  assignedToId?: number | null;
  status: TaskStatus;
  comments?: any[]; // adjust later if you have a Comment type
  createdAt: string;
  updatedAt: string;
}
