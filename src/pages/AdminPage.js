import React from 'react';

function AdminPage (props) { 
    
    const players = props.playersList
    console.log('AdminPage', players)

    return (
        <div id='#adminpage'>
            <h1>All players:</h1>
            <div className="row">
                <div className="column">
                    {players.map((player) => (
                    <div key={player.id}>{player.name}</div>
                    ))}
                </div>
                <div className="column">
                    {players.map((player) => (
                    <div key={player.id}>{player.email}</div>
                    ))}
                </div>
            </div>
        </div>
    )
  }

export default AdminPage;