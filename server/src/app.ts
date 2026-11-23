// // import express, { Application } from "express";
// // import cors from "cors";
// // import morgan from "morgan";
// // import { errorHandler } from "./middlewares/error.middleware.js";
// // import projectRoutes from "./projects/project.routes.js";
// // import taskRoutes from "./tasks/task.routes.js"
// // import authRoutes from "./auth/auth.routes.js";
// // import commentRoutes from "./comments/comment.routes.js";
// // import notificationRoutes from "./notifications/notification.routes.js";
// // import userRoutes from "./users/users.routes.js";


// // const app: Application = express();

// // // 🔹 Global middlewares
// // app.use(cors());
// // app.use(express.json({}));
// // app.use(morgan("dev"));


// // // 🔹 Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/projects", projectRoutes);
// // app.use("/api/tasks", taskRoutes);
// // app.use("/api/comments", commentRoutes);
// // app.use("/api/notifications", notificationRoutes);
// // app.use("/api/users", userRoutes);

// // // 🔹 Error handler (LAST)
// // app.use(errorHandler);

// // // 🔹 Health check
// // app.get("/", (req, res) => {
// //   res.send("API running 🚀");
// // });

// // export default app;

// import express, { Application } from "express";
// import cors, { CorsOptions } from "cors";
// import morgan from "morgan";
// import { errorHandler } from "./middlewares/error.middleware.js";

// import projectRoutes from "./projects/project.routes.js";
// import taskRoutes from "./tasks/task.routes.js";
// import authRoutes from "./auth/auth.routes.js";
// import commentRoutes from "./comments/comment.routes.js";
// import notificationRoutes from "./notifications/notification.routes.js";
// import userRoutes from "./users/users.routes.js";

// const app: Application = express();

// // 🔹 CORS configuration
// const corsOptions: CorsOptions = {
//   origin: "http://localhost:5173", // your frontend URL
//   credentials: true,               // allow cookies if needed
// };

// app.use(cors(corsOptions));
// app.use(express.json()); // parse JSON request bodies
// app.use(morgan("dev"));  // logging

// // 🔹 Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/users", userRoutes);

// // 🔹 Health check
// app.get("/", (req, res) => {
//   res.send("API running 🚀");
// });

// // 🔹 Global error handler (should be last)
// app.use(errorHandler);

// export default app;

import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";

import projectRoutes from "./projects/project.routes.js";
import taskRoutes from "./tasks/task.routes.js";
import authRoutes from "./auth/auth.routes.js";
import commentRoutes from "./comments/comment.routes.js";
import notificationRoutes from "./notifications/notification.routes.js";
import userRoutes from "./users/users.routes.js";

const app: Application = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://project-manager-front-end-alpha.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as curl/server-to-server calls
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Keep this as /api if VITE_API_URL ends with /api
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("API running 🚀");
});

app.use(errorHandler);

export default app;