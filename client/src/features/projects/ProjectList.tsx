import { useEffect } from "react";
import { useProjects } from "../../context/ProjectContext";

export const ProjectList = () => {
  const { projects, loading, error, getProjects } = useProjects();

  // Fetch projects on mount
  useEffect(() => {
    getProjects();
  }, []);

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="project-list-container">
      <h2>My Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found. Create your first project!</p>
      ) : (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id} className="project-item">
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
