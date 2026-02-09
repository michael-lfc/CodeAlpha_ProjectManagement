// src/features/tasks/TaskDetail.tsx
import { useParams } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { formatDate } from "../../utils/formatDate";
// import "./tasks.css";

export const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { getTaskById } = useTasks();

  if (!taskId) return <p className="error-text">Invalid task</p>;

  const taskIdNum = Number(taskId);
  if (isNaN(taskIdNum)) return <p className="error-text">Invalid task ID</p>;

  const task = getTaskById(taskIdNum);
  if (!task) return <p className="error-text">Task not found</p>;

  return (
    <div className="task-detail-container">
      <h2 className="task-detail-title">{task.title}</h2>
      <p className="task-detail-desc">{task.description}</p>
      <p className="task-detail-status">Status: {task.status}</p>
      <p className="task-detail-date">Created: {formatDate(task.createdAt)}</p>
    </div>
  );
};
