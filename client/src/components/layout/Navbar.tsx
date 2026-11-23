import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b">
      <Link to="/dashboard" className="font-bold text-lg">
        ProjectManager
      </Link>

      <div className="flex items-center gap-6">
        {/* 🔔 Notification icon */}
        <Link to="/dashboard" className="relative">
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}
        </Link>

        <span className="text-sm">{user?.name}</span>

        <button
          onClick={logout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
