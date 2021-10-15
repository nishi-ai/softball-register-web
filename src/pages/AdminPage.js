import React from 'react';
import Table from '../components/Table'

function AdminPage (props) { 
    
    const players = props.playersList
    console.log('AdminPage', players)
    // get header of table id, name, email
    const theadData = Object.keys(players[0]);
    // make an object include id for each key and info of each player
    const tbodyData = players.map((player, index) => {
        return {
            id: index,
            items: [index + 1, player.name, player.email]
        }
    })
    return (
        <div>
            <Table theadData={theadData} tbodyData={tbodyData} />
        </div>
    );
}

export default AdminPage;