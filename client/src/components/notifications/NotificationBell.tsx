import { useNotifications } from "../../context/NotificationContext";

const NotificationBell = () => {
  const { notifications, markAsRead, unreadCount } = useNotifications();

  return (
    <div className="relative">
      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs rounded-full text-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Simple dropdown */}
      <ul className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`px-4 py-2 border-b last:border-b-0 cursor-pointer ${
              n.read ? "bg-gray-100 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-600 font-bold"
            }`}
            onClick={() => markAsRead(n.id)}
          >
            {n.message}
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="px-4 py-2 text-gray-500 dark:text-gray-300">No notifications</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationBell;
