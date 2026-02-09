// src/features/notifications/NotificationList.tsx
import { useNotifications } from "../../context/NotificationContext"; // Use context
// import "./notification.css";

export const NotificationList = () => {
  const { notifications } = useNotifications();

  return (
    <div className="notification-container">
      <h4 className="notification-title">Notifications</h4>
      {notifications.length === 0 ? (
        <p className="notification-empty">No notifications</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li key={n.id} className="notification-item">
              {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
