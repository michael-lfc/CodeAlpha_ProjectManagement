import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" replace />;

  // Render the protected children
  return <>{children}</>;
};

export default ProtectedRoute;
