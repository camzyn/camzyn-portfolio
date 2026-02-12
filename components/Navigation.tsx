"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 left-0 right-0 border-b border-[#e5e5e5] bg-white/80 backdrop-blur dark:bg-[#1e1e1e]/80 dark:border-[#333]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="text-sm text-[#737373]">Camille Zyniewicz Kabele</div>
        <nav className="flex items-center gap-6 text-sm text-[#737373]">
          <button
            onClick={toggleTheme}
            className="hover:text-[#4b4b4b] transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2V3M8 13V14M14 8H13M3 8H2M11.5 11.5L10.79 10.79M5.21 5.21L4.5 4.5M11.5 4.5L10.79 5.21M5.21 10.79L4.5 11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 8.5C13.5 11.2614 11.2614 13.5 8.5 13.5C5.73858 13.5 3.5 11.2614 3.5 8.5C3.5 5.73858 5.73858 3.5 8.5 3.5C8.5 5.70914 10.2909 7.5 12.5 7.5C13.0523 7.5 13.5 7.73858 13.5 8.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <a
            href="#case-studies"
            className="flex items-center gap-1 hover:text-[#4b4b4b] transition-colors"
          >
            Case studies
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12L12 8L8 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}