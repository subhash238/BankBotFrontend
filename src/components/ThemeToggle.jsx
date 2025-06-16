import React from "react";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
