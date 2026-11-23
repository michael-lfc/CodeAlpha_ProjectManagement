import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Project } from "../types/project";
import * as projectApi from "../services/project.api";

interface ProjectContextType {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  addProject: (data: { name: string; description?: string }) => Promise<void>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const data = await projectApi.getMyProjects();
    setProjects(data);
  };

  const addProject = async (payload: { name: string; description?: string }) => {
    const newProject = await projectApi.createProject(payload);
    setProjects((prev) => [...prev, newProject]);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, fetchProjects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
