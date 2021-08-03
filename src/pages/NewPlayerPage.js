import AddPlayerForm from "../components/AddPlayerForm";

function NewPlayerPage() {
    // add async to be able to switch the page on the right timing after registration
    async function addPlayerHandler(playerData) {
        console.log("------", playerData)
        // send HTTP request to fetched URL, where you want to send
        // sendting data with post request should wait until all HTML pages will be exceuted
        // add 'ok' result on index.js on server
        try {
            const fetchResult = await fetch(
                'http://localhost:7000/player/registration',
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
            } else {
                // payload was not valid or something
                alert('Check your name or email again');
            }        
        } catch (error) {
            // The usage of fetch was something wrong OR json data from server was invalid
            alert('Ups! Something went wrong! Ask Bright!');
        }
    }
    return (
        <section>
            <h1>Softball</h1>
            {/* pass addPlayerHandler without () just pointing at a value to onAddPlayer */}
            <AddPlayerForm onAddPlayer={addPlayerHandler}/>
        </section>
    )
}

export default NewPlayerPage