import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import { useEffect } from "react";
import Title from "../components/Title";
import styles from "../styles/Home.module.css";

import data from "../BasicData.json";

function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className={styles.main}>
      <Title data={data.main} />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
