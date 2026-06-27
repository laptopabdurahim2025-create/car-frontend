import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} title={isDark ? "Light mode" : "Dark mode"}>
      {isDark ? <FaSun className="theme-icon sun" /> : <FaMoon className="theme-icon moon" />}
    </button>
  );
};

export default ThemeToggle;