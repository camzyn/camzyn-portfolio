"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      return stored === "dark";
    }
    return false;
  });

  useEffect(() => {
    console.log("Theme changed:", isDarkMode);
    console.log("HTML element:", document.documentElement);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      console.log("Added dark class, classes:", document.documentElement.className);
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Removed dark class, classes:", document.documentElement.className);
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
