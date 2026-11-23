import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";

const Sidebar = () => {
  const { projects } = useProjects();

  return (
    <aside className="w-64 border-r p-4">
      <h3 className="font-semibold mb-4">My Projects</h3>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              to={`/projects/${project.id}`}
              className="block hover:underline"
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
