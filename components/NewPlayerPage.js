import { useState } from "react";
import styled from "styled-components";
import styles from "./Form.module.css";
import AddPlayerForm from "../components/AddPlayerForm";

function NewPlayerPage(props) {
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [showNameErrorMessage, setShowNameErrorMessage] = useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);
  const [showDupliEmailErrorMessage, setShowDupliEmailErrorMessage] =
    useState(false);

  // add async to be able to switch the page on the right timing after registration
  async function addPlayerHandler(playerData) {
    setIsCallLoading(true);
    setShowNameErrorMessage(false);
    setShowEmailErrorMessage(false);
    // send HTTP request to fetched URL, where you want to send
    // sendting data with post request should wait until all HTML pages will be exceuted
    // add 'ok' result on index.js on server
    try {
      const fetchResult = await fetch(
        "/api/add-players",
        // most API requires POST method to store data
        {
          // GET is default
          method: "POST",
          // body is a data you want to send as JSON format
          body: JSON.stringify(playerData),
          // add some extra headers, if needed, ex. Content-type. extra metadata
          // to the outgoing request to make it clear that this request carries json data
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // handle the response, to get an access to the response data
      const response = await fetchResult.json();

      if (fetchResult.status === 200) {
        window.location = "/registered";
      }
      if (fetchResult.status === 409) {
        console.log("----  email is already taken");
        setShowDupliEmailErrorMessage(true);
      }
      // payload was not valid or something
      // put error message when name or email is missing
      else if (fetchResult.status === 422) {
        if (response.validationErrors.length >= 2) {
          console.log("----  name and email both are invalid");
          setShowNameErrorMessage(true);
          setShowEmailErrorMessage(true);
        } else if (response.validationErrors[0].param === "name") {
          console.log("----  name is invalid");
          setShowNameErrorMessage(true);
        } else if (response.validationErrors[0].param === "email") {
          console.log("----  email is invalid");
          setShowEmailErrorMessage(true);
        }
      }
    } catch (error) {
      // The usage of fetch was something wrong OR json data from server was invalid
      window.location = "/500";
      console.log("error here:", error);
    }
    // disable button in case there's an http request running
    setIsCallLoading(false);
  }

  const { registeration } = props.data;

  return (
    <div className={styles.formContaier}>
      <AddPlayerForm
        callLoading={isCallLoading}
        onAddPlayer={addPlayerHandler}
        showNameErrorMessage={showNameErrorMessage}
        showEmailErrorMessage={showEmailErrorMessage}
        showDupliEmailErrorMessage={showDupliEmailErrorMessage}
      />
      <p className={styles.registrationDesc}>{registeration}</p>
    </div>
  );
}

export default NewPlayerPage;
