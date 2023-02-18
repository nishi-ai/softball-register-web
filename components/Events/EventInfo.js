import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import Loader from "./Loader";
import styles from "./Event.module.css";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const DisplayEventInfo = (props) => {
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [eventData, setEventData] = useState([]);

  const getEventDataHandler = async () => {
    setIsCallLoading(true);
    try {
      setEventData(props.result);
    } catch (error) {
      alert("fetch failed!!!");
      console.log(error);
      window.location = "/500";
    }
    setIsCallLoading(false);
  };
  // call get data handler in the useEffect hook which runs once when the component is mounted.
  useEffect(() => {
    getEventDataHandler();
  }, []);

  return (
    <div>
      <div className={styles.eventContainer}>
        {isCallLoading && <Loader />}
        <EventCard eventData={eventData} />
      </div>
    </div>
  );
};

export default DisplayEventInfo;
