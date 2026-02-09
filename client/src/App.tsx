import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { useAuth } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { ProjectList } from "./features/projects/ProjectList";

// ✅ PrivateRoute ensures the user is logged in before rendering children
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, authReady } = useAuth();

  // Show a loading screen while auth is initializing
  if (!authReady || loading) return <div className="loading">Loading...</div>;

  // Redirect to login if user is not authenticated
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

function App() {
  const { user, authReady } = useAuth();

  // Wait until auth state is ready
  if (!authReady) return <div className="loading">Loading authentication...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ProjectProvider>
                <ProjectList />
              </ProjectProvider>
            </PrivateRoute>
          }
        />

        {/* Fallback route */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
