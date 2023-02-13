import React, { useState, useEffect } from "react";
import styled from "styled-components";

import EventCard from "./EventCard";
import LoadingDots from "../LoadingDots";
import styles from "./Event.module.css";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const DisplayEventInfo = () => {
  const [isCallLoading, setIsCallLoading] = useState(false);
  // const [eventData, setEventData] = useState([]);
  const eventData = [
    { date: new Date('2021-05-01'), result: { cats: 1, dogs: 5 } },
    { date: new Date('2021-06-01'), result: { cats: 15, dogs: 10 } },
    { date: new Date('2022-07-01'), result: { cats: 1, dogs: 10 }  },
    { date: new Date('2020-05-01'), result: { cats: 15, dogs: 10 } },
    { date: new Date('2023-04-01'), result: null },
  ]
  const getEventDataHandler = async () => {
    setIsCallLoading(true);
    try {
      const result = await fetch(`${apiUrl}/events?sort=desc`);
      let responseData = await result.json();
      responseData = responseData.map((item) => {
        return {
          ...item,
        };
      });
      if (result.status === 200) {
        console.log("success fechted", responseData);
        setEventData(responseData);
      }
    } catch (error) {
      alert("fetch failed!!!");
      console.log(error);
      // window.location = "/500"
    }
    setIsCallLoading(false);
  };
  // call get data handler in the useEffect hook which runs once when the component is mounted.
  useEffect(() => {
    // getEventDataHandler();
  }, []);

  return (
    <div>
      <div className={styles.eventContainer}>
        {isCallLoading && <LoadingDots />}
        <EventCard eventData={eventData} />
      </div>
    </div>
  );
};

export default DisplayEventInfo;
