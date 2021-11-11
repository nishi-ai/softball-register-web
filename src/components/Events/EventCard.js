import { React } from 'react';

import EventItem from './EventItem'
import './EventCard.css'

function EventCard (props) {

    const data = props.eventData
    console.log('props data:', data)

    // const currentDate = new Date()
    // console.log('currentDate:', currentDate)

    // const isPast = (date) => {
    //    if (date < currentDate) {
    //     //    return true
    //     console.log(date < currentDate)
    //    }
    // };

    const isResultNull = (result) => {
        if (result === null) {
            return true
        }
    };

    return (
       <ul className='events-list'>
        {data.map((item) => (
        <EventItem
          key={item.id}
          date={new Date(item.date)}
          result={item.result}
          isResultNull={isResultNull(item.result)}
        />
      ))}
    </ul>
    )
}

export default EventCard;