import React, { useState } from 'react';

import PasswordForm from '../components/PasswordForm'
import AdminPage from './AdminPage';

const apiUrl = process.env.REACT_APP_SERVER_URL

function LoginToAdminPage() {
    const [ authorized , setAuthorized ] = useState(false);
    const [ callLoading , setCallLoading ] = useState(false);
    const [ showPasswordErrorMessage, setShowPasswordErrorMessage ] = useState(false)
    const [ playersList, setPlayersList ] = useState([]);
    const [ password, setPassword ] = useState('');
    
    const getPlayersDataHandler = async (password) => {
        const adminPassword = password
        setPassword(adminPassword)

        setCallLoading(true);
        setShowPasswordErrorMessage(false);
        try {
            const result = await fetch(
                `${apiUrl}/admin/players/?password=${adminPassword}`,
            );
            let responseData = await result.json();
            responseData = responseData.map(item => {
                return {
                    ...item,
                    selected: false
                };
            })

            const getselectedList = (e, item, responseData) => {
                responseData.map((player) => {
                    if (player._id === item._id) {
                        player.selected = e.target.checked;
                    }
                    return player
                });
            setPlayersList(responseData)
            }

            if (result.status === 200) {
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
            <AdminPage
                playersList={playersList}
                password={password}
                getPlayersDataHandler={getPlayersDataHandler}
                getselectedList={getselectedList} />
        )}
    </section>
    )
}

export default LoginToAdminPage;