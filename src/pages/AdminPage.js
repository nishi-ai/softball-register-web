import React, { useState } from 'react';

const apiUrl = process.env.REACT_APP_SERVER_URL

function AdminPage (props) { 
    const players = props.playersList
    console.log('AdminPage', players)
    const [ masterChecked, setMasterChecked ] = useState(false)
    // const [ selectedList, setSelectedList ] = useState([]);
    const [ randomNum, setRandomNum ] = useState(0);

    // select all
    const onMasterCheck = (e) => {
        let tempList = players
        tempList.map((player) => ( player.selected = e.target.checked));
        setMasterChecked(e.target.checked);
        // setSelectedList(players.filter((e) => e.selected))
    }

    // select items
    const onItemCheck = (e, item) => {
        let tempList = players
        tempList.map((player) => {
            if (player._id === item._id) {
                player.selected = e.target.checked;
            }
            return player;
        });

        // to Control Master Checkbox State
        const totalItems = players.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        setMasterChecked(totalItems === totalCheckedItems);
        // console.log('setSelectedList1', players.filter((e) => e.selected))
        // setSelectedList(players.filter((e) => e.selected))
        setRandomNum(Math.random())
    }

    const getSelectedRows = async () => {
        // extract only emails from selected items
        const emailsArray = players.flatMap((e) => e.selected ? [e.email] : [])
        // console.log('emailsArray', emailsArray)
        // setSelectedList(emailsArray)
        // console.log('setSelectedList2', emailsArray);
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
                // console.log('setSelectedList3');
                // setSelectedList([])
            }
        } catch (error) {
            // window.location = "/500"
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
                                />
                            </th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => (
                        <tr key={player.id} className={player.selected ? "selected" : ""}>
                             <th scope="row">
                                <input
                                type='checkbox'
                                checked={player.selected}
                                className="form-check-input"
                                id={player.id}
                                onChange={(e) => onItemCheck(e, player)}
                            />
                            </th>
                            <td>{player.name}</td>
                            <td>{player.email}</td>
                        </tr>
                            ))}
                    </tbody>
                    
                    </table>
                </div>
            </div>
        </div>
        

    );
}

export default AdminPage;