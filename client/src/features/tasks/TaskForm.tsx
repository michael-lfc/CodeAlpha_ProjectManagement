// src/features/tasks/TaskForm.tsx
import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
// import "./tasks.css";

interface TaskFormProps {
  projectId: number;
}

export const TaskForm = ({ projectId }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const { createTask, loading, error } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title cannot be empty");
    createTask(title, projectId);
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {loading && <Loading />}
      {error && <Error message={error} />}
      <input
        className="task-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <button type="submit" className="task-button">
        Add Task
      </button>
    </form>
  );
};
