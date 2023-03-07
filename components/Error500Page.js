import React, { Component } from "react";
import styles from "./BasicInfo.module.css";

export default function Error500Page(props) {
  const { error, errorDescription } = props.data;

  return (
    <div className={styles.statusContaier}>
      <div className={styles.subTitle}>
        <h2>{error}</h2>
        <span className={styles.emoji}>🥶</span>
      </div>
      <h3>{errorDescription}</h3>
    </div>
  );
}
