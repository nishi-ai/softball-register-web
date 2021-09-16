import { useState } from 'react';

import AddPlayerForm from "../components/AddPlayerForm";

const apiUrl = process.env.REACT_APP_SERVER_URL

function NewPlayerPage() {
    const [ callLoading , setCallLoading ] = useState(false);
    // const [ invalidValue, setInvalidValue] = useState('')
    const [ showNameErrorMessage, setShowNameErrorMessage ] = useState(false)
    const [ showEmailErrorMessage, setShowEmailErrorMessage ] = useState(false)
   
    // add async to be able to switch the page on the right timing after registration
    async function addPlayerHandler(playerData) {
        console.log("------", playerData)
        setCallLoading(true)
        setShowNameErrorMessage(false)
        setShowEmailErrorMessage(false)
        // send HTTP request to fetched URL, where you want to send
        // sendting data with post request should wait until all HTML pages will be exceuted
        // add 'ok' result on index.js on server
        try {

            const fetchResult = await fetch(
                `${apiUrl}/player/registration`,
                // most API requires POST method to store data
                {
                    // GET is default
                    method: 'POST',
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

            if (fetchResult.status === 200) {
                window.location = "/registered"
                console.log('successful registered');
            } 
            // payload was not valid or something
            // put error message when name or email is missing
            else if (response.validationErrors.length >= 2) {
                console.log('----  name and email both are invalid')
                setShowNameErrorMessage(true)
                setShowEmailErrorMessage(true)     
            } else if (response.validationErrors[0].param === 'name') {
                console.log('----  name is invalid');
                setShowNameErrorMessage(true)
               
            } else if (response.validationErrors[0].param === 'email') {
                console.log('----  email is invalid');
                setShowEmailErrorMessage(true)
            }
        } catch (error) {
            // The usage of fetch was something wrong OR json data from server was invalid
            // alert('Ups! Something went wrong! Ask Bright!');
            window.location = "/500"
        }
        // disable button in case there's an http request running
        setCallLoading(false);
    }
    return (
        <section id="form">
            {/* pass addPlayerHandler without () just pointing at a value to onAddPlayer */}
            <AddPlayerForm
                // export functions to allow to use in a child component 
                callLoading={callLoading}
                onAddPlayer={addPlayerHandler}
                showNameErrorMessage={showNameErrorMessage}
                showEmailErrorMessage={showEmailErrorMessage}
                />
        </section>
    )
}

export default NewPlayerPage