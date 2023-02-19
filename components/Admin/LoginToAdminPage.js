import React, { useEffect, useState } from "react";

import PasswordForm from "../PasswordForm";
import PlayerList from "./PlayerList";

function LoginToAdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [iscallLoading, setIscallLoading] = useState(false);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] =
    useState(false);
  const [playersList, setPlayersList] = useState([]);
  const [password, setPassword] = useState("");

  // create selected players list
  const setPlayerSelected = (index, isSelected) => {
    // create a temporary playerlist to make sure not to change the original.
    const tempArray = playersList.map((player) => {
      return {
        ...player,
      };
    });
    tempArray[index].selected = isSelected;
    // set the only seleced item's isSelected as 'true'
    setPlayersList(tempArray);
  };

  // select all
  const setPlayerSelectedAll = (isSelected) => {
    const tempArray = playersList.map((player) => {
      return {
        ...player,
      };
    });
    tempArray.forEach((player) => (player.selected = isSelected));
    setPlayersList(tempArray);
  };

  const getSuccessfullFechedData = async (password) => {
    setPassword(password);
    const result = await fetch("/api/playerslist", {
      headers: { Authorization: `Token ${password}` },
    });
    let responseData = await result.json();
    if (result.status === 200) {
      responseData = responseData.map((item, index) => {
        return {
          ...item,
          id: index + 1,
          selected: false,
        };
      });
      setPlayersList(responseData);
      setAuthorized(true);
    }
    if (result.status === 403) {
      setShowPasswordErrorMessage(true);
      sessionStorage.removeItem("storedPassword");
    }
  };

  const getPlayersDataHandler = async (password) => {
    const adminPassword = password;

    setIscallLoading(true);
    setShowPasswordErrorMessage(false);

    try {
      await getSuccessfullFechedData(adminPassword);
    } catch (error) {
      window.location = "/500";
    }
    setIscallLoading(false);
  };
  //   UseEffect content will disply in the first place one time.
  //   if some state is inside of array [] and updated, useEffect will be called again.
  useEffect(() => {
    const storedPassword = sessionStorage.getItem("storedPassword");
    if (storedPassword) {
      try {
        getSuccessfullFechedData(storedPassword);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  return (
    <div id='form'>
      {!authorized && (
        <PasswordForm
          iscallLoading={iscallLoading}
          getPlayersDataHandler={getPlayersDataHandler}
          showPasswordErrorMessage={showPasswordErrorMessage}
        />
      )}
      {authorized && playersList && (
        <PlayerList
          playersList={playersList}
          password={password}
          getPlayersDataHandler={getPlayersDataHandler}
          setPlayerSelected={setPlayerSelected}
          setPlayerSelectedAll={setPlayerSelectedAll}
        />
      )}
    </div>
  );
}

export default LoginToAdminPage;
