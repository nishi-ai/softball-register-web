import React, { Component } from "react";
import styles from "./BasicInfo.module.css";

export default function Error500Page(props) {
  const { error, errorDescription } = props.data;

  return (
    <div className={styles.statusContaier}>
      <h2>{error}</h2>
      <h3>{errorDescription}</h3>
    </div>
  );
}
