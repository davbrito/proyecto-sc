import { type CreateTheme, createTheme } from "@nextui-org/react";
import React, { useState } from "react";

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

  const toggleTheme = () => {
    setTheme(({ className }) =>
      className === "light-theme" ? darkTheme : light
    );
  };

  return {
    theme,
    toggleTheme,
  };
};
