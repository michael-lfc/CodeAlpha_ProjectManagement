// src/components/Layout.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
// import "./Layout.css";
import "../css/dashboard.css";


interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>My Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">{children}</main>
    </div>
  );
};
