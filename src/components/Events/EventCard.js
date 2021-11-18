import { React } from 'react';

import EventItem from './EventItem'
import './EventCard.css'

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
       <ul className='events-list'>
        {data.map((item) => (
        <EventItem
          key={item.id}
          date={new Date(item.date)}
          result={item.result}
        />
      ))}
    </ul>
    )
}

export default EventCard;