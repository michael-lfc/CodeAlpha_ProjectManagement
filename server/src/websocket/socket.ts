// import { Server } from "socket.io";
// import http from "http";

// /**
//  * Initialize WebSocket server
//  * @param server HTTP server instance
//  */
// export const initSocket = (server: http.Server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",  // change this to your frontend URL in production
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("💬 New client connected:", socket.id);

//     /**
//      * Frontend emits "register" with userId after login
//      * Each user joins a room: user_<id>
//      */
//     socket.on("register", (userId: number) => {
//       console.log(`User ${userId} joined room: user_${userId}`);
//       socket.join(`user_${userId}`);
//     });

//     // Optional: handle disconnect
//     socket.on("disconnect", () => {
//       console.log("Client disconnected:", socket.id);
//     });
//   });

//   return io;
// };

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

