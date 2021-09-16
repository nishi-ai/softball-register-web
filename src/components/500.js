import React, {Component} from 'react'

class Error500 extends Component {
  render() {

    return (
      <div id='error'>
        <h1>Some error occurred!</h1>
        <p>We're working on fixing this, sorry for the inconvenience!</p>
      </div>
    )
  }
}

export default Error500;