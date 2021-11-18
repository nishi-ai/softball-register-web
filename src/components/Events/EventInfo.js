import React, { useState, useEffect } from 'react';

import  EventCard  from './EventCard'
import Card from '../UI/Card';
import './EventInfo.css';

const apiUrl = process.env.REACT_APP_SERVER_URL

const DisplayEventInfo = () => {
    const [ eventData, setEventData ] = useState([]);
    
    const getEventDataHandler = async () => {
        try {
            const result = await fetch(
                `${apiUrl}/events`
            );
            let responseData = await result.json();
            responseData = responseData.map(item => {
                return {
                    ...item
                };
            })
            if (result.status === 200) {
                console.log('success fechted', responseData)
                setEventData(responseData);
            };
        } catch (error) {
            alert('fetch failed!!!')
            console.log(error);
            // window.location = "/500"
        };
    }
    // call get data handler in the useEffect hook which runs once when the component is mounted.
    useEffect(() => {
        getEventDataHandler();
    }, []);

    return (
        <div>
      <Card className='events'>
         <EventCard 
            eventData={eventData}      
         />
      </Card>
    </div>
    );
  }

export default DisplayEventInfo;