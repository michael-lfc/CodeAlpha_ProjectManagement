// // src/api/task.api.ts
// import { api } from "./axios";
// import type { Task } from "../types/task";

// // Payload types
// export interface CreateTaskPayload {
//   title: string;
//   description?: string;
//   projectId: number;
//   assignedToId?: number;
// }

// export interface UpdateTaskStatusPayload {
//   status: "TODO" | "IN_PROGRESS" | "DONE";
// }

// // Create task
// export const createTask = async (payload: CreateTaskPayload, token: string): Promise<Task> => {
//   const res = await api.post("/tasks", payload, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data.data.task;
// };

// // Update task status
// export const updateTaskStatus = async (
//   taskId: number,
//   payload: UpdateTaskStatusPayload,
//   token: string
// ): Promise<Task> => {
//   const res = await api.patch(`/tasks/${taskId}/status`, payload, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data.data.task;
// };

// // Get tasks by project
// export const getTasksByProject = async (projectId: number, token: string): Promise<Task[]> => {
//   const res = await api.get(`/tasks/project/${projectId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data.data.tasks;
// };

import  api  from "./axios";
import type { Task } from "../types/task";

// Payload types
export interface CreateTaskPayload {
  title: string;
  description?: string;
  projectId: number;
  assignedToId?: number;
}

export interface UpdateTaskStatusPayload {
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

// Create task
export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const res = await api.post("/tasks", payload);
  return res.data.data.task;
};

// Update task status
export const updateTaskStatus = async (taskId: number, payload: UpdateTaskStatusPayload): Promise<Task> => {
  const res = await api.patch(`/tasks/${taskId}/status`, payload);
  return res.data.data.task;
};

// Get tasks by project
export const getTasksByProject = async (projectId: number): Promise<Task[]> => {
  const res = await api.get(`/tasks/project/${projectId}`);
  return res.data.data.tasks;
};

