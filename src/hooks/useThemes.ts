import { type CreateTheme, createTheme } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "#202020",
      red: "#d80a0a",
      footerBg: "#0b0e10",
      bgGreen: "rgb(5,45,22)",
    },
  },
});

const light = createTheme({
  type: "light",
  theme: {
    colors: {
      background: "#ddd",
      red: "#d80a0a",
      footerBg: "#f8f8f8",
      bgGreen: "rgb(74,222,128)",
    },
  },
});

export const useThemes = () => {
  const [theme, setTheme] = useState<CreateTheme>(darkTheme);

  useEffect(() => {
    setTheme(
      localStorage.getItem("theme")?.includes("dark") ? darkTheme : light
    );
  }, []);

  const toggleTheme = () => {
    setTheme(({ className }) =>
      className === "light-theme" ? darkTheme : light
    );

    localStorage.setItem(
      "theme",
      theme.className === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  return {
    theme,
    toggleTheme,
  };
};
