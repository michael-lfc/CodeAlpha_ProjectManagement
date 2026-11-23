import type { User } from "./user";
import type { Task } from "./task";

export interface Project {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
  owner: User;
  members: User[];
  tasks: Task[];
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export interface AddMemberPayload {
  userId: number;
}

export interface ProjectResponse {
  status: "success";
  data: {
    project: Project;
  };
}

export interface ProjectsResponse {
  status: "success";
  results: number;
  data: {
    projects: Project[];
  };
}

export interface DeleteProjectResponse {
  status: "success";
  message: string;
}
