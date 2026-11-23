import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { useTheme } from "./context/ThemeContext" // use hooks folder
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <div className={theme === "dark" ? "dark" : ""}>
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
