import React from "react";
import EventCard from "./EventCard";
import styles from "./Event.module.css";
import { Events, EventsResult } from "../../types";

const DisplayEventInfo = (props: {
  eventData: Events[];
  errorState: EventsResult;
}) => {
  // when union types => eventData: Events[] | EventsResult
  // let error: string | undefined
  // if (!Array.isArray(props.eventData) && props.eventData.error) {
  //   error = props.eventData.error
  // }
  const error = props.errorState;
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
