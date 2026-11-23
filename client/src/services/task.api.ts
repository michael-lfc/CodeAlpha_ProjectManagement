import axios from "axios";
import type { Task, TaskStatus } from "../types/task";

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await axios.post(`${API_URL}/tasks`, task);
  return res.data.data.task;
};

export const getTasksByProject = async (projectId: number): Promise<Task[]> => {
  const res = await axios.get(`${API_URL}/tasks/project/${projectId}`);
  return res.data.data.tasks;
};

export const updateTaskStatus = async (taskId: number, status: TaskStatus): Promise<Task> => {
  const res = await axios.patch(`${API_URL}/tasks/${taskId}/status`, { status });
  return res.data.data.task;
};
