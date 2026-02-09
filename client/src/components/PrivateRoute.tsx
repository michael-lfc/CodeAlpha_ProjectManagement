import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, token, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Show while checking auth
  if (!user || !token) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
