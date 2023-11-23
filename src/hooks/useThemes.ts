import { useEffect, useState } from "react";

// const darkTheme = createTheme({
//   type: "dark",
//   theme: {
//     colors: {
//       background: "#202020",
//       red: "#d80a0a",
//       footerBg: "#0b0e10",
//       bgGreen: "rgb(5,45,22)",
//     },
//   },
// });

// const light = createTheme({
//   type: "light",
//   theme: {
//     colors: {
//       background: "#ddd",
//       red: "#d80a0a",
//       footerBg: "#f8f8f8",
//       bgGreen: "rgb(74,222,128)",
//     },
//   },
// });

const initialTheme = globalThis.localStorage?.getItem("theme")?.includes("dark")
  ? "dark"
  : globalThis.localStorage?.getItem("theme")?.includes("light")
    ? "light"
    : globalThis.window?.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

export const useThemes = () => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme.includes("dark")) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
