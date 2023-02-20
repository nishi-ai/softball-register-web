import React, { Component } from "react";
import styles from "./BasicInfo.module.css";

export default function RegisteredPage(props) {
  const { success, successDescription } = props.data;

  return (
    <div className={styles.statusContaier}>
      <h2>{success}</h2>
      <h3>{successDescription}</h3>
    </div>
  );
}
