import type { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  taskId: number;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}
