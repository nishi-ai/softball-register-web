import React from "react";
import styled from "styled-components";

import EventDate from "./EventDate";
import styles from "./Event.module.css";

const EventItem = (props) => {
  return (
    <li>
      <div className={styles.card}>
        <EventDate date={props.date} />
        <div className={styles.description}>
          <div className={styles.result}>
            {!props.result
              ? "Upcoming..."
              : `Cats ${props.result.cats} vs Dogs ${props.result.dogs}`}
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
