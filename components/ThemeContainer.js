import { useContext } from "react";
import ThemeContext from "../context/darkMode";

/**
 * Wraps elements in \<div\>  with className="dark" when dark mode is enabled
 */
export default function ThemeContainer({ children, notFullHeight = false }) {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={
        (notFullHeight ? "" : "min-h-screen") +
        " flex min-w-screen " +
        (theme.darkMode ? "dark" : "")
      }
      id="themeContainer"
    >
      <div id="baseTheme" className="bg-slate-100 dark:bg-slate-900 w-full">
        {children}
      </div>
    </div>
  );
}
