import React from "react";
import EventCard from "./EventCard";
import styles from "./Event.module.css";
import { Events, EventsResult } from "../../types/index";

const DisplayEventInfo = (props: {
  eventData: Events[];
  errorState: EventsResult;
}) => {
  const error = props.errorState?.error;
  const eventData = props.eventData;
  return (
    <div>
      <div className={styles.eventContainer}>
        {!error ? (
          <EventCard eventData={eventData} />
        ) : (
          <div className={styles.errorDescription}>
            <h3>Event Infomation</h3>
            <p>We will update soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayEventInfo;
