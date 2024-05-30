// ThemeContext.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const lightTheme = {
    dark: "#fff",
    secondary: "#FBB02E",
    primary: "#FBB02E",
    bg: "#ebedf7",
    text: "#000000",
    graph: "#FBB02E",
  };

  const darkTheme = {
    dark: "#0e0e23",
    secondary: "#fff",
    primary: "#000000",
    bg: "#333",
    text: "#fff",
    graph: "#ddd",
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: theme === "light" ? lightTheme : darkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
