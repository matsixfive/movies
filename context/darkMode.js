import { createContext, useMemo, useState, useEffect } from "react";
import { setCookies, getCookie } from "cookies-next";

const ThemeContext = createContext();

export default ThemeContext;

/**
 * Gives child elements access to ThemeContext context
 */
export function ThemeWrapper({ children }) {
  let darkCookie = getCookie("darkMode");
  if (typeof darkCookie === "undefined") darkCookie = true;

  const [darkMode, setDarkMode] = useState(true);

  // Sets darkMode state to cookie value on first render
  useEffect(() => {
    setDarkMode(darkCookie);
  }, []);

  // When darkMode is changed, re-set cookie
  useEffect(() => {
    setCookies("darkMode", darkMode);
  }, [darkMode]);

  /**
   * Toggle between dark and light mode
   */
  const toggleTheme = (theme) => {
    setDarkMode(theme || !darkMode);
    console.log("Dark theme " + (darkMode ? "%cdisabled" : "%cenabled"), "color:" + (darkMode ? "yellow" : "lightblue"));
  };

  const value = useMemo(
    () => ({
      darkMode,
      toggleTheme,
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
