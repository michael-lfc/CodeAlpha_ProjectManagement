import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";
import { connectSocket, disconnectSocket } from "../services/socket";
import { useAuth } from "./AuthContext";

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 🔹 Fetch existing notifications
  useEffect(() => {
    if (!user) return;

    api.get("/notifications").then((res) => {
      setNotifications(res.data.data.notifications);
    });
  }, [user]);

  // 🔹 Socket real-time listener
  useEffect(() => {
    if (!user) return;

    const socket = connectSocket(user.id);

    socket.on("new-notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      disconnectSocket();
    };
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, setNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used inside provider");
  return ctx;
};
