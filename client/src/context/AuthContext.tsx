import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  // add more fields if needed
}

interface AuthContextType {
  user: User | null;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async ({ email, password }: { email: string; password: string }) => {
    const res = await api.post("/auth/login", { email, password });
    // Assuming your backend returns: { status: 'success', data: { user, token } }
    setUser(res.data.data.user);

    // Optionally save token in localStorage
    localStorage.setItem("token", res.data.data.token);

    navigate("/dashboard"); // Redirect after login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
