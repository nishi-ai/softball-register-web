import React, { useState, useEffect } from "react";
import styled from "styled-components";

import EventCard from "./EventCard";
import Card from "../UI/Card";
import LoadingDots from "../LoadingDots";

const StyledCard = styled(Card)`
  padding: 1rem;
  margin: 2rem auto;
  margin-bottom: 4rem;
  width: max-content;
`;

const apiUrl = process.env.REACT_APP_SERVER_URL;

const DisplayEventInfo = () => {
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [eventData, setEventData] = useState([]);

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
    getEventDataHandler();
  }, []);

  return (
    <div>
      <StyledCard>
        {isCallLoading && <LoadingDots />}
        <EventCard eventData={eventData} />
      </StyledCard>
    </div>
  );
};

export default DisplayEventInfo;
