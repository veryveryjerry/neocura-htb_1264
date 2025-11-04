import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle
 * - Stores preference in localStorage
 * - Respects system preference on first load
 * - Toggles the .dark class on document.documentElement
 */

const THEME_KEY = "theme"; // 'light' | 'dark'

function getInitialTheme(): "light" | "dark" {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved as "light" | "dark";

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  } catch {
    // ignore localStorage errors
  }
  return "light";
}

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm transition-colors
                 bg-white/90 text-foreground hover:bg-white/95 dark:bg-transparent dark:border-transparent dark:text-foreground"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-600" />
      )}
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;