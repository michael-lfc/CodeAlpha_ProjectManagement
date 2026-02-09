// client/src/types/project.ts
import type { User } from "./user";

export interface Project {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
  owner?: User;
  members?: User[];
  createdAt: string;
}
