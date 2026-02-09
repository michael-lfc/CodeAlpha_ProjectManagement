import { Request } from "express";
import { Server } from "socket.io";

// ✅ Extend Express Request type to include `io`
declare module "express-serve-static-core" {
  interface Request {
    io?: Server; // optional, since not all requests need it
    user?: {
      id: number;
      name: string;
      email: string;
    };
  }
}
