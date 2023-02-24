import React, { Component } from "react";
import styles from "./BasicInfo.module.css";

export default function RegisteredPage(props) {
  const { success, successDescription } = props.data;

  return (
    <div className={styles.statusContaier}>
      <div className={styles.subTitle}>
        <h2>{success}</h2>
        <span className={styles.emoji}>🎉</span>
      </div>
      <h3>{successDescription}</h3>
    </div>
  );
}
