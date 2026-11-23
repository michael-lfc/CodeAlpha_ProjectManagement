import { createContext, useContext, useState, type ReactNode } from "react";
import type { Task } from "../types/task";
import { getTasksByProject } from "../services/task.api";

interface TaskContextType {
  tasks: Task[];
  fetchTasks: (projectId: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async (projectId: number) => {
    try {
      const data = await getTasksByProject(projectId);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
