import { Server } from "socket.io";
import http from "http";

let io: Server | null = null; // <-- singleton

/**
 * Initialize Socket.IO server
 */
export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("💬 New client connected:", socket.id);

    socket.on("register", (userId: number) => {
      console.log(`User ${userId} joined room: user_${userId}`);
      socket.join(`user_${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

/**
 * Getter for the Socket.IO instance
 * Controllers can safely call this
 */
export const getIo = (): Server => {
  if (!io) throw new Error("Socket.IO not initialized yet!");
  return io;
};

