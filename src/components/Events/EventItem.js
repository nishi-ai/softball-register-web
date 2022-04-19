import React from "react";
import styled from "styled-components";

import EventDate from "./EventDate";
import Card from "../UI/Card";

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 1rem 0;
  background-color: #1f2434;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  flex-flow: column-reverse;
  justify-content: flex-start;
  flex: 1;
  @media (min-width: 580px) {
    align-items: center;
    justify-content: center;
    flex: 1;
  }
`;

const StyledResult = styled.div`
  display: flex;
  flex: 1;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border-radius: 12px;
  align-items: center;
  justify-content: flex-start;
  flex-flow: column-reverse;
  padding: 0.5rem 1.5rem;
  @media (min-width: 580px) {
    font-size: 1.25rem;
    padding: 0.5rem 1.5rem;
    justify-content: center;
  }
`;

const EventItem = (props) => {
  return (
    <li>
      <StyledCard>
        <EventDate date={props.date} />
        <StyledDescription>
          <StyledResult>
            {!props.result
              ? "Upcoming..."
              : `Cats ${props.result.cats} vs Dogs ${props.result.dogs}`}
          </StyledResult>
        </StyledDescription>
      </StyledCard>
    </li>
  );
};

export default EventItem;
