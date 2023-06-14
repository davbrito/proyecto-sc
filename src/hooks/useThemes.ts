import { type CreateTheme, createTheme } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "#1e2225",
    },
  },
});

const light = createTheme({
  type: "light",
  theme: {
    colors: {
      background: "#eee",
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
