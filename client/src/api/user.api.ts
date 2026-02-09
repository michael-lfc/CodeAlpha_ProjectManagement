// src/api/user.api.ts
import  api  from "./axios";
import type { User } from "../types/user";

// Payload types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

// Login
export const loginUser = async (payload: LoginPayload): Promise<{ token: string; user: User }> => {
  const res = await api.post("/auth/login", payload);
  return res.data.data; // assuming backend returns { data: { token, user } }
};

// Register
export const registerUser = async (payload: RegisterPayload): Promise<{ token: string; user: User }> => {
  const res = await api.post("/auth/register", payload);
  return res.data.data;
};

// Fetch current user
export const fetchCurrentUser = async (token: string): Promise<User> => {
  const res = await api.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data.user; // assuming backend returns { data: { user } }
};
