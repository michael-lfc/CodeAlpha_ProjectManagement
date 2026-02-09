// src/features/projects/ProjectBoard.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { TaskForm } from "../tasks/TaskForm";
import { sortTasksByStatus } from "../../utils/sortTasks";
// import "./projects.css";

export const ProjectBoard = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById } = useProjects();
  const { tasks, getTasksByProject, loading, error } = useTasks();

  if (!projectId) return <p className="error-text">Invalid project</p>;

  const projectIdNum = Number(projectId);
  if (isNaN(projectIdNum)) return <p className="error-text">Invalid project ID</p>;

  const project = getProjectById(projectIdNum);
  if (!project) return <p className="error-text">Project not found</p>;

  useEffect(() => {
    getTasksByProject(projectIdNum);
  }, [projectIdNum]);

  const sortedTasks = sortTasksByStatus(tasks);

  return (
    <div className="project-board-container">
      <h2 className="project-board-title">{project.name}</h2>

      <TaskForm projectId={projectIdNum} />

      {loading && <p className="loading-text">Loading tasks...</p>}
      {error && <p className="error-text">{error}</p>}

      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task.id} className="task-item">
            <strong>{task.title}</strong> – {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
