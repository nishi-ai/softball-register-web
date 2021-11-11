import React from 'react';

import EventDate from './EventDate';
import Card from '../UI/Card';
import './EventItem.css';

const EventItem = (props) => {
    // const result = props.result
    // console.log(result)
    // console.log(props.isResultNull)
    const date = props.date

    const currentDate = new Date()
    console.log('currentDate:', currentDate)

    const isPast = (date) => {
       if (date < currentDate) {
           return true
        // console.log(date < currentDate)
       }
    };
    // console.log(isPast(date))

    return (
        <li>
            <Card className='expense-item'>
                <EventDate date={new Date(props.date)} />
                {props.isResultNull ?
                <h2 className='events-list__fallback'>Upcoming...</h2>
                : 
                <div className='expense-item__description'>
                    <h2>{props.title}</h2>
                    <div className='expense-item__price'>
                        Cats {props.result.cats} vs Dogs {props.result.dogs}
                    </div>
                </div>} 
            </Card>
        </li>
    );
};

export default EventItem;