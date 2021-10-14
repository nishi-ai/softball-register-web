import React, { useEffect, useState } from 'react';

import PasswordForm from '../components/PasswordForm'
import AdminPage from './AdminPage';

const apiUrl = process.env.REACT_APP_SERVER_URL

function LoginToAdminPage() {
    const [ authorized , setAuthorized ] = useState(false);
    const [ callLoading , setCallLoading ] = useState(false);
    const [ showPasswordErrorMessage, setShowPasswordErrorMessage ] = useState(false)
    const [ playersList, setPlayersList ] = useState([]);
    const [ password, setPassword ] = useState();
   
    const getPasswordHandler = async (passwordObject) => {
        setPassword(passwordObject.password)
    }
    useEffect(() => {
        const fetchData = async () => {
            setCallLoading(true);
            setShowPasswordErrorMessage(false)
            try {
                const result = await fetch(
                    `${apiUrl}/admin/players/?password=${password}`,
                );
                const responseData = await result.json();

                if (result.status === 200) {
                    const component = (
                        <AdminPage playersList={responseData}/>
                    )
                    setPlayersList(component);
                    setAuthorized(true);
                }
                if (result.status === 403) {
                    setShowPasswordErrorMessage(true)
                }
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        setCallLoading(false);
      }, [password]);
    // disable button in case there
  
    return (
    <section id="form">
        {!authorized && <PasswordForm
            callLoading={callLoading}
            getPasswordHandler={getPasswordHandler}
            showPasswordErrorMessage={showPasswordErrorMessage}
        />}
        {authorized && playersList}
    </section>
    )
}

export default LoginToAdminPage;