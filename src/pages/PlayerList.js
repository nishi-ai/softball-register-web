import React from 'react';

const apiUrl = process.env.REACT_APP_SERVER_URL

function PlayerList (props) { 
    const players = props.playersList
    console.log('AdminPage', players)

    // select all
    const onSelectAll = (e) => {
        props.setPlayerSelectedAll(e.target.checked);
    }

    // select items
    const onItemCheck = (e, index) => {
        props.setPlayerSelected(index, e.target.checked)  
    }

    const deleteSelectedPlayers = async () => {
        // extract only emails from selected items, use faltmap
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
                    onClick={() => deleteSelectedPlayers()}
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
                                 id="mastercheck"
                                 onChange={(e) => onSelectAll(e)}
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

export default PlayerList;