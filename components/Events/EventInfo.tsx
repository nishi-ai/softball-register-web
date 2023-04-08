import React from "react";
import Events from "./Events";
import styles from "./Event.module.css";
import { Events as EventsType, EventsResult } from "../../types";

const DisplayEventInfo = (props: {
  eventData: EventsType[];
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
    <div className={styles.eventContainer}>
      {!error ? (
        <Events eventData={eventData} />
      ) : (
        <div className={styles.errorDescription}>
          <h3>Event Infomation</h3>
          <p>We will update soon!</p>
        </div>
      )}
    </div>
  );
};

export default DisplayEventInfo;
