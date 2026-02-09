// // src/api/notification.api.ts
// import { api } from "./axios";
// import type { Notification } from "../types/notification";

// // Get all notifications for current user
// export const getNotifications = async (token: string): Promise<Notification[]> => {
//   const res = await api.get("/notifications", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data.data.notifications;
// };

// // Mark notification as read
// export const markNotificationAsRead = async (id: number, token: string): Promise<Notification> => {
//   const res = await api.patch(`/notifications/${id}/read`, null, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data.data.notification;
// };

import  api  from "./axios";
import type { Notification } from "../types/notification";

// Get all notifications for current user
export const getNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notifications");
  return res.data.data.notifications;
};

// Mark notification as read
export const markNotificationAsRead = async (id: number): Promise<Notification> => {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data.data.notification;
};
