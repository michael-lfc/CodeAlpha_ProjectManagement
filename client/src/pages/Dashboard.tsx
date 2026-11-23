// src/pages/Dashboard.tsx
import { useProjects } from "../hooks/useProjects";

const Dashboard = () => {
  const { projects } = useProjects();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500">You have no projects yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold">{project.name}</h2>
              {project.description && (
                <p className="text-gray-600 mt-1">{project.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Members: {project.members.length}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
