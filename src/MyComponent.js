import React, {Component} from 'react'

class MyComponent extends Component {
    state = {
        text: "This is my span with State.",
    }

    // life cycle methods
    componentDidMount(){
        // like birthday  
        console.log("boom!!!!!");

        setTimeout(() => {
            this.setState({
                text: "Hello"
            })
        }, 2000);
    }


    render(){
        return (<div>
            {/* <button onClick={() => {
                this.setState({
                    text: "Hello"
                })
            }}>change text</button> */}
            <span>{this.state.text}</span>
            <br/>
            <span>1 {this.props.shouldsay} 2</span>
        </div>)
    }
}

export default MyComponent;