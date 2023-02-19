import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import styles from "./Event.module.css";

const DisplayEventInfo = (props) => {
  const [eventData, setEventData] = useState([]);

  const getEventDataHandler = async () => {
    try {
      setEventData(props.result);
    } catch (error) {
      alert("fetch failed!!!");
      console.log(error);
      window.location = "/500";
    }
  };
  // call get data handler in the useEffect hook which runs once when the component is mounted.
  useEffect(() => {
    getEventDataHandler();
  }, []);

  return (
    <div>
      <div className={styles.eventContainer}>
        <EventCard eventData={eventData} />
      </div>
    </div>
  );
};

export default DisplayEventInfo;
