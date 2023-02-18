import React from "react";
import styles from "./Event.module.css";

const Loader = () => {
  return (
    <div className={styles.loading}>
      <div className={`${styles.ball} ${styles.one}`}></div>
      <div className={`${styles.ball} ${styles.two}`}></div>
      <div className={`${styles.ball} ${styles.three}`}></div>
      <div className={`${styles.ball} ${styles.four}`}></div>
    </div>
  );
};

export default Loader;
