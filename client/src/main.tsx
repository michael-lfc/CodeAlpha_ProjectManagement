import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Context providers
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { CommentProvider } from "./context/CommentContext";
import { NotificationProvider } from "./context/NotificationContext";

// CSS imports
import "./css/global.css";
import "./css/auth.css";
import "./css/dashboard.css";
import "./css/projects.css";
import "./css/tasks.css";
import "./css/comments.css";
import "./css/Notifications.css";
import "./css/users.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <CommentProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </CommentProvider>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);
