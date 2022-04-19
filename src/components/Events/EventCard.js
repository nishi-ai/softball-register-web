import { React } from "react";
import styled from "styled-components";
import EventTabPanel from "./EventTabPanel";

const StyledUnOrderedList = styled.ul`
  list-style: none;
  padding: 0;
`;

function EventCard(props) {
  const data = props.eventData;

  return (
    <StyledUnOrderedList key={data.id}>
      <EventTabPanel key={data.id} data={data} />
    </StyledUnOrderedList>
  );
}

export default EventCard;
