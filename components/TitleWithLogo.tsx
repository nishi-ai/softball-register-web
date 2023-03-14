import React from "react";
import styles from "./Title.module.css";
import Image from "next/image";
import { BasicDataMain } from "../types";

export default function TitleWithLogo(props: { data: BasicDataMain }) {
  const { teamName, sportName, city } = props.data;
  const routeChange = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.title}>
      <div className={styles.image} onClick={routeChange}>
        <Image src='/soft.png' alt='Logo image' width={250} height={250} />
      </div>
      <div className={styles.titleOnImage}>
        <h1 className={styles.teamName}>{teamName}</h1>
        <h1 className={styles.softball}>{sportName}</h1>
        <h3>{city}</h3>
      </div>
    </div>
  );
}
