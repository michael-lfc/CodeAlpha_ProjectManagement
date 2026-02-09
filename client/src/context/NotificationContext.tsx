import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Notification } from "../types/notification";
import * as notificationAPI from "../api/notification.api";

interface NotificationContextType {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    const data = await notificationAPI.getNotifications();
    setNotifications(data);
  };

  const markAsRead = async (id: number) => {
    const updated = await notificationAPI.markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? updated : n))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, fetchNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};
