import type { User } from "./user";

// Matches your backend auth response
export interface AuthResponse {
  status: "success";
  data: {
    user: User;
    token: string;
  };
}
