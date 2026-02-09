import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import type { Project } from "../types/project";
import * as projectAPI from "../api/project.api";

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  getProjects: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { user, authReady } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProjects = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await projectAPI.getMyProjects();
      setProjects(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (name: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const newProject = await projectAPI.createProject({ name });
      setProjects((prev) => [...prev, newProject]);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authReady && user) getProjects();
  }, [authReady, user]);

  return (
    <ProjectContext.Provider value={{ projects, loading, error, getProjects, createProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
};
