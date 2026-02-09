import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/task";
import * as taskAPI from "../api/task.api";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  getTasksByProject: (projectId: number) => Promise<void>;
  createTask: (title: string, projectId: number) => Promise<void>;
  getTaskById: (id: number) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTasksByProject = async (projectId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskAPI.getTasksByProject(projectId); // Axios auto token
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title: string, projectId: number) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await taskAPI.createTask({ title, projectId });
      setTasks((prev) => [...prev, newTask]);
    } catch (err: any) {
      setError(err.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const getTaskById = (id: number) => tasks.find((t) => t.id === id);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, getTasksByProject, createTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
