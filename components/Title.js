import React from "react";
import styled, { keyframes, css } from "styled-components";
import styles from "./Title.module.css";
import Image from "next/image";

export default function Ttile(props) {
  return (
    <div className={styles.title}>
      <div className={styles.image}>
        <Image src='/soft.png' alt='Logo image' width={250} height={250} />
      </div>
      <div className={styles.titleOnImage}>
        <h1 className={styles.teamName}>{props.data.teamName}</h1>
        <h1 className={styles.softball}>{props.data.sportName}</h1>
        <h3>{props.data.city}</h3>
      </div>
    </div>
  );
}
