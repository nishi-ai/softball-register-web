import React from 'react';

const apiUrl = process.env.REACT_APP_SERVER_URL
const password = process.env.REACT_APP_ADMIN_PASSWORD

function GetAllPlayers(password) {

    // add async to be able to switch the page on the right timing after registration
    async function GetPlayersHandler(playerData) {
        console.log("------", playerData)
        
        try {
            const fetchResult = await fetch(
                `${apiUrl}/admin/players/?password=${password}`,
                // most API requires POST method to store data
                {
                    // GET is default
                    method: 'GET',
                    // body is a data you want to send as JSON format
                    body: JSON.stringify(playerData),
                    // add some extra headers, if needed, ex. Content-type. extra metadata
                    // to the outgoing request to make it clear that this request carries json data
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            // handle the response, to get an access to the response data 
            const response = await fetchResult.json();
            // console loged data
            console.log('response json',response);
            
        } catch (error) {
           console.log(error)
        }
        
    }

    return (
        <section id="form">
            {GetPlayersHandler()}
        </section>
    )
}

export default GetAllPlayers