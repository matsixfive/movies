import { useState } from "react";
import ThemeContext from "../context/darkMode";

import MoonDark from "../icons/MoonDark";
import SunLight from "../icons/SunLight";

export default function ToggleThemeButton() {
  const [checked, setChecked] = useState(true);
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <>
          <button
            onClick={() => {
              theme.toggleTheme();
            }}
            className="dark:text-slate-100 text-slate-900"
          >
            {theme.darkMode ? (
              <SunLight className="hover:text-yellow-300" />
            ) : (
              <MoonDark className="hover:text-blue-600" />
            )}
          </button>
        </>
      )}
    </ThemeContext.Consumer>
  );
}