import React, { useState } from 'react';

import PasswordForm from '../components/PasswordForm'
import PlayerList from './PlayerList';

const apiUrl = process.env.REACT_APP_SERVER_URL

function LoginToAdminPage() {
    const [ authorized , setAuthorized ] = useState(false);
    const [ callLoading , setCallLoading ] = useState(false);
    const [ showPasswordErrorMessage, setShowPasswordErrorMessage ] = useState(false)
    const [ playersList, setPlayersList ] = useState([]);
    const [ password, setPassword ] = useState('');

    // create selected players list
    const setPlayerSelected = (index, isSelected) => {
        // create a temporary playerlist to make sure not to changie the original.
        const tempArray = playersList.map(player => {
            return {
                ...player,
            }
        });
        tempArray[index].selected = isSelected;
        // set the only seleced item's isSelected as 'true'
        setPlayersList(tempArray);
    }

     // select all
    const setPlayerSelectedAll = (isSelected) => {
        const tempArray = playersList.map(player => {
            return {
                ...player,
            }
        });
        tempArray.forEach(player => player.selected = isSelected)
        setPlayersList(tempArray);
    }
    
    const getPlayersDataHandler = async (password) => {
        const adminPassword = password
        console.log('adminPassword', adminPassword)
        setPassword(adminPassword)

        setCallLoading(true);
        setShowPasswordErrorMessage(false);

        try {
            const result = await fetch(
                // `${apiUrl}/admin/players/?password=${adminPassword}`,
                `${apiUrl}/admin/players/`,
                {   
                    // method: 'POST',
                    headers: { 'Authorization': `Token ${adminPassword}`}
                });
            let responseData = await result.json();
            if (result.status === 200) {
                responseData = responseData.map(item => {
                    return {
                        ...item,
                        selected: false
                    };
                })
                setPlayersList(responseData);
                setAuthorized(true);
            };
            if (result.status === 403) {
                setShowPasswordErrorMessage(true)
            };
        } catch (error) {
            console.log(error);
            window.location = "/500"
        };
        setCallLoading(false);
    }
    
    return (
    <section id="form">
        {!authorized && <PasswordForm
            callLoading={callLoading}
            getPlayersDataHandler={getPlayersDataHandler}
            showPasswordErrorMessage={showPasswordErrorMessage}
        />}
        {(authorized && playersList) && (
            <PlayerList
                playersList={playersList}
                password={password}
                getPlayersDataHandler={getPlayersDataHandler}
                setPlayerSelected={setPlayerSelected}
                setPlayerSelectedAll={setPlayerSelectedAll} />
        )}
    </section>
    )
}

export default LoginToAdminPage;