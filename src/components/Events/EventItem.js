import React from 'react';

import EventDate from './EventDate';
import Card from '../UI/Card';
import './EventItem.css';

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
            <Card className='expense-item'>
                <EventDate date={props.date} />
                {!props.result ?
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