import React, { createContext, useMemo, useState, useEffect } from "react";
import { setCookies, getCookie } from "cookies-next";

const ThemeContext = createContext({
  darkMode: true,
  toggleTheme: () => {},
});

export default ThemeContext;

/**
 * Gives child elements access to ThemeContext context
 */
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  let darkCookie = getCookie("darkMode");
  let darkVal = true;
  if (typeof darkCookie === "boolean") darkVal = darkCookie;

  const [darkMode, setDarkMode] = useState(true);

  // Sets darkMode state to cookie value on first render
  useEffect(() => {
    setDarkMode(darkVal);
  }, []);

  // When darkMode is changed, re-set cookie
  useEffect(() => {
    setCookies("darkMode", darkMode);
  }, [darkMode]);

  /**
   * Toggle between dark and light mode
   */
  const toggleTheme = (theme?: boolean) => {
    setDarkMode(theme || !darkMode);
    console.log(
      "Dark theme " + (darkMode ? "%cdisabled" : "%cenabled"),
      "color:" + (darkMode ? "yellow" : "lightblue")
    );
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
