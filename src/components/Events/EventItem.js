import React from 'react';
import styled from "styled-components";

import EventDate from './EventDate';
import Card from '../UI/Card';

const StyledCard = styled(Card)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin: 1rem 0;
    background-color: #4b4b4b;
`;

const StyledText = styled.h2`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1rem;
    align-items: center;
    flex-flow: column-reverse;
    justify-content: flex-start;
    flex: 1;
    color: white;
    text-align: center;
    @media (min-width: 580px) {
          font-size: 1.25rem;
    }
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
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #282c34;
    border: 1px solid white;
    padding: 0.5rem;
    border-radius: 12px;
    align-items: center;
    @media (min-width: 580px) {
        font-size: 1.25rem;
        padding: 0.5rem 1.5rem;
    }
`

const EventItem = (props) => {

    const currentDate = new Date()
    console.log('currentDate:', currentDate)

    // const isPast = (date) => {
    //    if (date < currentDate) {
    //        return false
    //     // console.log(date < currentDate)
    //    }
    // };

    return (
        <li>
            <StyledCard>
                <EventDate date={props.date} />
                {!props.result ?
                <StyledText>Upcoming...</StyledText>
                : 
                <StyledDescription>
                    <StyledResult>
                        Cats {props.result.cats} vs Dogs {props.result.dogs}
                    </StyledResult>
                </StyledDescription>} 
            </StyledCard>
        </li>
    );
};

export default EventItem;