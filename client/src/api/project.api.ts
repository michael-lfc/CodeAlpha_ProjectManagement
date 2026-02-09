import api from "./axios";
import type { Project } from "../types/project";

// Fetch all projects for current user
export const getMyProjects = async (): Promise<Project[]> => {
  const res = await api.get("/projects/my-projects");
  return res.data.data; // backend returns { status, data: [...] }
};

// Create a new project
export const createProject = async (payload: { name: string }): Promise<Project> => {
  const res = await api.post("/projects", payload);
  return res.data.data; // backend returns { status, data: { project } }
};
