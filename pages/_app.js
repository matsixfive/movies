import { ThemeWrapper } from "../context/darkMode";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeWrapper>
      <Component {...pageProps} />
    </ThemeWrapper>
  );
}

export default MyApp;
