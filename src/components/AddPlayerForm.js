import { React } from 'react';
// directly access to reference cue DOM elements
import { useRef, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

function AddPlayerForm(props) {
    const nameInputRef = useRef();
    const emailInputRef = useRef();

    // disable button in case there's an http request running
    // use the useEffect hook to set a state defalt: false
    

    const submitHandler = (event) => {
        // setLoading(true);
        // prevent the browser default to allow to fully handle the submission
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
     
        // Rest API to send server & DB
        const playerData = {
            name: enteredName,
            email: enteredEmail
        };
   
        props.onAddPlayer(playerData) 
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
                
                <Button variant="outline-primary" type="submit" disabled={props.callLoading}>
                {props.callLoading && (
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                )}
                <span>Register</span>
                </Button>{' '}
            </Form>
        );
}

export default AddPlayerForm;