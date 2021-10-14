import React, { useState } from 'react';

import PasswordForm from '../components/PasswordForm'
import AdminPage from './AdminPage';

const apiUrl = process.env.REACT_APP_SERVER_URL

function LoginToAdminPage() {
    const [ authorized , setAuthorized ] = useState(false);
    const [ callLoading , setCallLoading ] = useState(false);
    const [ showPasswordErrorMessage, setShowPasswordErrorMessage ] = useState(false)
    const [ playersList, setPlayersList ] = useState([]);
    
    const getPlayersDataHandler = async (passwordObject) => {
        const adminPassword = passwordObject.password

        setCallLoading(true);
        setShowPasswordErrorMessage(false);
        try {
            const result = await fetch(
                `${apiUrl}/admin/players/?password=${adminPassword}`,
            );
            const responseData = await result.json();

            if (result.status === 200) {
                setPlayersList(responseData);
                setAuthorized(true);
            };
            if (result.status === 403) {
                setShowPasswordErrorMessage(true)
            };
            
        } catch (error) {
            console.log(error);
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
            <AdminPage playersList={playersList}/>
        )}
    </section>
    )
}

export default LoginToAdminPage;