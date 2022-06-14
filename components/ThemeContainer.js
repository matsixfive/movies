import { useContext } from "react";
import ThemeContext from "../context/darkMode";

/**
 * Wraps elements in div with dark className when dark mode is enabled
 */
export default function ThemeContainer(props) {
  const theme = useContext(ThemeContext);
  return <div className={theme.darkMode && " dark"}>{props.children}</div>;
}
