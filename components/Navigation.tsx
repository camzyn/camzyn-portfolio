"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface NavigationProps {
  variant?: "full" | "minimal";
  sticky?: boolean;
}

export default function Navigation({ variant = "full", sticky = false }: NavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Skip the hide-on-scroll behavior if sticky is true
    if (sticky) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, sticky]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isMobileMenuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const caseStudies = [
    { title: "Viewrail (Coming Soon)", link: "#", comingSoon: true },
    { title: "Landings (Coming Soon)", link: "#", comingSoon: true },
    { title: "CAMZYN Studio (Coming Soon)", link: "#", comingSoon: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 p-6 z-40 flex justify-between items-start bg-white dark:bg-[#1e1e1e] transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <Link
        href="/"
        className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors font-[family-name:var(--font-family-body)]"
        style={{ fontSize: '13px' }}
      >
        Camille Zyniewicz Kabele
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <button
          onClick={toggleDarkMode}
          className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          aria-label="Toggle dark mode"
        >
          {mounted ? (isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />) : <div className="w-4 h-4" />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors font-[family-name:var(--font-family-body)] font-normal"
            style={{ fontSize: '13px' }}
          >
            Case studies
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#2a2a2a] border border-neutral-400 dark:border-neutral-600 rounded-lg shadow-lg overflow-hidden">
              {caseStudies.map((study, index) => (
                study.comingSoon ? (
                  <div
                    key={index}
                    className="px-4 py-3 text-neutral-400 dark:text-neutral-400 cursor-not-allowed font-[family-name:var(--font-family-body)] transition-colors duration-300"
                    style={{ fontSize: '13px' }}
                  >
                    {study.title}
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={study.link}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors font-[family-name:var(--font-family-body)]"
                    style={{ fontSize: '13px' }}
                  >
                    {study.title}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-6 mt-2 w-56 bg-white dark:bg-[#2a2a2a] border border-neutral-400 dark:border-neutral-600 rounded-lg shadow-lg overflow-hidden md:hidden">
          {caseStudies.map((study, index) => (
            study.comingSoon ? (
              <div
                key={index}
                className="px-4 py-3 text-neutral-400 dark:text-neutral-400 cursor-not-allowed font-[family-name:var(--font-family-body)] transition-colors duration-300"
                style={{ fontSize: '13px' }}
              >
                {study.title}
              </div>
            ) : (
              <Link
                key={index}
                href={study.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors font-[family-name:var(--font-family-body)]"
                style={{ fontSize: '13px' }}
              >
                {study.title}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  );
}
