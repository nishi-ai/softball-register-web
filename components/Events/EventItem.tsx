import React from "react";
import EventDate from "./EventDate";
import styles from "./Event.module.css";
import { Result } from "../../types";

const EventItem = (props: { date: Date; result: Result }) => {
  const { date, result } = props;
  return (
    <li>
      <div className={styles.card}>
        <EventDate date={date} />
        <div className={styles.description}>
          <div className={styles.result}>
            {!result
              ? "Upcoming..."
              : `Cats ${result.cats} vs Dogs ${result.dogs}`}
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
