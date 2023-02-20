import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import styles from "./Event.module.css";

const DisplayEventInfo = (props) => {
  return (
    <div>
      <div className={styles.eventContainer}>
        <EventCard eventData={props.result} />
      </div>
    </div>
  );
};

export default DisplayEventInfo;
