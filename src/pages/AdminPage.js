import React, { useState } from 'react';

const apiUrl = process.env.REACT_APP_SERVER_URL

function AdminPage (props) { 
    const players = props.playersList
    console.log('AdminPage', players)
    const [ masterChecked, setMasterChecked ] = useState(false)
    const [ randomNum, setRandomNum ] = useState(0);

    // select all
    const onMasterCheck = (e) => {
        let tempList = players
        tempList.map((player) => ( player.selected = e.target.checked));
        setMasterChecked(e.target.checked);

    }

    // select items
    const onItemCheck = (e, index) => {
        props.setPlayerSelected(index, e.target.checked)  
        setRandomNum(Math.random())
    }

    const getSelectedRows = async () => {
        // extract only emails from selected items
        const emailsArray = players.flatMap((e) => e.selected ? [e.email] : [])
        const adminPassword = props.password

        try {
            const fetchResult = await fetch(
                `${apiUrl}/admin/players/?password=${adminPassword}`,
                {
                    method: 'DELETE',
                    body: JSON.stringify(emailsArray),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (fetchResult.status === 200) {
                // console.log('successful deleted');
                props.getPlayersDataHandler(adminPassword)
            }
        } catch (error) {
            window.location = "/500"
            console.log('error here:', error)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <button
                    className="btn btn-primary pull-right"
                    onClick={() => getSelectedRows()}
                    // value={selectedList}
                >
                    Delete
                </button>
                    <table>
                    <thead>
                        <tr>
                            <th scope="col">
                                <input
                                 type='checkbox'
                                 className="form-check-input"
                                 checked={masterChecked}
                                 id="mastercheck"
                                 onChange={(e) => onMasterCheck(e)}
                                 value={randomNum}
                                />
                            </th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => {
                            return (
                            <tr key={player.id} className={player.selected ? "selected" : ""}>
                                <th scope="row">
                                    <input
                                        type='checkbox'
                                        checked={player.selected}
                                        className="form-check-input"
                                        id={player.id}
                                        onChange={(e) => onItemCheck(e, index)}
                                        value={randomNum}
                                    />
                                </th>
                                <td>{player.name}</td>
                                <td>{player.email}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        

    );
}

export default AdminPage;