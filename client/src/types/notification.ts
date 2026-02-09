export interface Notification {
  id: number;
  userId: number;
  message: string;
  type?: string;       // e.g., TASK_ASSIGNED, COMMENT
  link?: string;       // e.g., /tasks/1
  relatedId?: number;  // task or comment ID
  read: boolean;
  createdAt: string;   // ISO string
  updatedAt: string;   // ISO string
}
