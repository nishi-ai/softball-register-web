import { React } from 'react';
// directly access to reference cue DOM elements
import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

function AddPlayerForm(props) {
    const nameInputRef = useRef();
    const emailInputRef = useRef();

    const submitHandler = (event) => {
        // prevent the browser default to allow to fully handle the submission
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
     
        // Rest API to send server & DB
        const playerData = {
            name: enteredName,
            email: enteredEmail
        };
    
        // console.log('playerData', playerData);
        // forward the data to a parent component, where this AddPlayerForm Component is used
        props.onAddPlayer(playerData);
    }
        return (
            <Form onSubmit={submitHandler}>
                
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='playername'>Name</Form.Label>
                    <Form.Control type="name" placeholder="taro" ref={nameInputRef} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" ref={emailInputRef} />
                </Form.Group>
                
                <Button variant="outline-primary" type="submit">Register</Button>{' '}
                
            </Form>
        );
}

export default AddPlayerForm;