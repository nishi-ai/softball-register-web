import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import { useEffect } from "react";
import TitleWithLogo from "../components/TitleWithLogo";
import styles from "../styles/Home.module.css";

import data from "../BasicData.json";

function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className={styles.main}>
      <TitleWithLogo data={data.main} />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
