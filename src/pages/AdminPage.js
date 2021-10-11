import React from 'react';
import GetAllPlayers from '../components/GetAllPlayers'

function AdminPage() {
    const password = this.props.match.params.password
    const allPlayers = GetAllPlayers(password)
    console.log(allPlayers);

    return (
      <div id='registered'>
        <h1>here is admin page!</h1>
        <div>{allPlayers}</div>
      </div>
    )
  }

export default AdminPage;