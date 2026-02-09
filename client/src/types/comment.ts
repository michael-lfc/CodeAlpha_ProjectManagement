export interface Comment {
  id: number;
  content: string;
  taskId: number;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
