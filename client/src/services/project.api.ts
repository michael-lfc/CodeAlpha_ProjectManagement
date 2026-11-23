import api from "./api";
import type {
  ProjectResponse,
  ProjectsResponse,
  CreateProjectPayload,
  AddMemberPayload,
  DeleteProjectResponse,
} from "../types/project";

export const getMyProjects = async () => {
  const res = await api.get<ProjectsResponse>("/projects/my-projects");
  return res.data.data.projects;
};

export const getProjectById = async (id: number) => {
  const res = await api.get<ProjectResponse>(`/projects/${id}`);
  return res.data.data.project;
};

export const createProject = async (payload: CreateProjectPayload) => {
  const res = await api.post<ProjectResponse>("/projects", payload);
  return res.data.data.project;
};

export const updateProject = async (id: number, payload: Partial<CreateProjectPayload>) => {
  const res = await api.put<ProjectResponse>(`/projects/${id}`, payload);
  return res.data.data.project;
};

export const deleteProject = async (id: number) => {
  const res = await api.delete<DeleteProjectResponse>(`/projects/${id}`);
  return res.data.message;
};

export const addMemberToProject = async (projectId: number, payload: AddMemberPayload) => {
  const res = await api.post<ProjectResponse>(`/projects/${projectId}/members`, payload);
  return res.data.data.project;
};
