import React, { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">
        <div className="p-4 border-b flex justify-between">
          <h1 className="text-xl font-bold">bankGPT</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
        <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout;
