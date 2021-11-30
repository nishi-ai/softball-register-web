import { React } from 'react';
import styled from "styled-components";

import EventItem from './EventItem'

const StyledUnOrderedList = styled.ul`
  list-style: none;
  padding: 0;
`;

function EventCard (props) {

    const data = props.eventData
    console.log('props data:', data)

    // const isPast = (date) => {
    //    if (date < currentDate) {
    //     //    return true
    //     console.log(date < currentDate)
    //    }
    // };

    return (
       <StyledUnOrderedList>
        {data.map((item) => (
        <EventItem
          key={item.id}
          date={new Date(item.date)}
          result={item.result}
        />
      ))}
    </StyledUnOrderedList>
    )
}

export default EventCard;