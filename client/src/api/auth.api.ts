import api from "./axios";

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: string; // make sure matches backend
  };
  token: string;
}

// Login function
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data.data;
};

// Register function
export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data.data;
};
