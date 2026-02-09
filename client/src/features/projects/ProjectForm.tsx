// src/features/projects/ProjectForm.tsx
import { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
// import "./projects.css";

export const ProjectForm = () => {
  const [name, setName] = useState("");
  const { createProject, loading, error } = useProjects();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Project name cannot be empty");
    createProject(name);
    setName("");
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Create New Project</h3>
      {loading && <Loading />}
      {error && <Error message={error} />}

      <input
        className="project-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
      />
      <button type="submit" className="project-button">
        Create
      </button>
    </form>
  );
};
