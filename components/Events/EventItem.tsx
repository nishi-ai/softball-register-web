import React from "react";
import EventDate from "./EventDate";
import styles from "./Event.module.css";

const EventItem = (props: any) => {
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
