import React from "react";
import styles from "./BasicInfo.module.css";
import { BasicDataStatus } from "../types/index";

export default function RegisteredPage(props: { data: BasicDataStatus }) {
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
