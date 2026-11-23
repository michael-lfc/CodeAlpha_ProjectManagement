import api from "../../services/api";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface Notification {
  id: number;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

interface Props {
  notification: Notification;
  onRead?: (id: number) => void;
}

const NotificationItem = ({ notification, onRead }: Props) => {
  const [isRead, setIsRead] = useState(notification.read);
  const [loading, setLoading] = useState(false);

  const markAsRead = async () => {
    if (isRead || loading) return;

    try {
      setLoading(true);

      // ✅ USE api (configured axios instance)
      await api.patch(`/notifications/${notification.id}/read`);

      setIsRead(true);
      onRead?.(notification.id);
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={markAsRead}
      className={`p-3 border-b cursor-pointer ${
        isRead ? "bg-gray-100" : "bg-white"
      }`}
    >
      <p className={`${isRead ? "text-gray-500" : "font-semibold"}`}>
        {notification.message}
      </p>

      {notification.link && (
        <Link
          to={notification.link}
          className="text-sm text-blue-500 underline"
          onClick={(e) => e.stopPropagation()} // 👈 prevent double click
        >
          View
        </Link>
      )}

      <p className="text-xs text-gray-400 mt-1">
        {new Date(notification.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default NotificationItem;
