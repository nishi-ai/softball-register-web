import React from 'react';

function AdminPage (props) { 
    
    const players = props.playersList
    console.log('AdminPage', players)

    return (
        <table>
            {players.map(player => (
            <tr key={player.id}>  
                <td>{player.name}</td>
                <td>{player.email}</td>
            </tr>
            ))}
        </table>

    );
}

export default AdminPage;