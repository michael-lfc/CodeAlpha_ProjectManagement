import  type { Project } from "../types/project";

export const useProjects = () => {
  // IDs are numbers to match Task.projectId
  const projects: Project[] = [
    { id: 1, name: "Demo Project", ownerId: 1, createdAt: "2026-01-01" },
    { id: 2, name: "Second Project", ownerId: 2, createdAt: "2026-01-02" },
  ];

  const getProjectById = (id: number) => projects.find((p) => p.id === id);

  const createProject = (name: string) => {
    console.log("Create project:", name);
  };

  return { projects, getProjectById, createProject };
};
