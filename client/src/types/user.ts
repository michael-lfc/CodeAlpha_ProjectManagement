// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// src/types/auth.ts
export interface AuthResponse {
  status: "success";
  data: {
    user: User;
    token: string;
  };
}
