import http from "http";
import app from "./app.js";
import { initSocket } from "./websocket/socket.js";

const server = http.createServer(app);

// Initialize WebSocket
const io = initSocket(server);

// Attach io to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Start server
const PORT = Number(process.env.PORT) || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
