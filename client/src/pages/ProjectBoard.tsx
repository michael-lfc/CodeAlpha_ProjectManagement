import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../context/TaskContext";

const ProjectBoard = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjects();
  const { tasks, fetchTasks } = useTasks();

  const project = projects.find((p) => p.id === Number(id));

  useEffect(() => {
    if (id) fetchTasks(Number(id));
  }, [id]);

  if (!project) return <p className="p-6 text-red-500">Project not found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      {project.description && <p className="text-gray-700 mb-6">{project.description}</p>}

      <h2 className="text-2xl font-semibold mb-2">Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow"
            >
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">
                Assigned to: {task.assignedTo?.name || "Unassigned"}
              </p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Members</h2>
      <ul className="flex flex-wrap gap-3">
        {project.members.map((member) => (
          <li
            key={member.id}
            className="px-3 py-1 border rounded-full bg-gray-100 dark:bg-gray-700 text-sm"
          >
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectBoard;
