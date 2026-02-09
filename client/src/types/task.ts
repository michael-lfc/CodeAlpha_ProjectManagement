export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  projectId: number;
  assignedToId?: number;
  assignedTo?: {
    id: number;
    name: string;
    email: string;
  };
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
