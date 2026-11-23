export interface Notification {
  id: number;
  userId: number;
  message: string;
  type?: string;
  link?: string;
  relatedId?: number;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
