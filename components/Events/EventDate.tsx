import React from "react";
import styles from "./Event.module.css";

const EventDate = (props: { date: Date }) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className={styles.date}>
      <div className={styles.month}>{month}</div>
      <div className={styles.year}>{year}</div>
      <div className={styles.day}>{day}</div>
    </div>
  );
};

export default EventDate;
