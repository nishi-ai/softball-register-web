import { React } from 'react';
// directly access to reference cue DOM elements
import { Form, Button, Spinner } from 'react-bootstrap';

import useInput from '../hooks/use-input'

function AddPlayerForm(props) {
    // use hook useInput
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHanlder: nameBlurHanlder,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '' && value.length >= 2);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: EmailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHanlder: emailBlurHanlder,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));

    // to manage overall form validity
    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        // prevent the browser default of senfing a request,  to allow to fully handle the submission
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        // if enteredNameIsValid is valid, just return and stop here
        // if (props.showNameErrorMessage) {
        //     console.log('showNameErrorMessage true', props.showNameErrorMessage)
        //     // return;
        // } else {
        //     console.log('showNameErrorMessage false', props.showNameErrorMessage)
        // }
             
        // Rest API to send server & DB
        const playerData = {
            name: enteredName,
            email: enteredEmail
        };

        props.onAddPlayer(playerData);

        // reset states
        resetNameInput();
        resetEmailInput();
    };

        return (
            <Form noValidate onSubmit={submitHandler} validated={enteredNameIsValid && enteredEmailIsValid}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='playername'>Name</Form.Label>
                    <Form.Control
                        type="name"
                        id="name"
                        placeholder="taro"
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHanlder}
                        value={enteredName}
                    />
                    {(props.showNameErrorMessage || nameInputHasError) && (
                     <p className='error-text'>
                         More than 2 letters required
                    </p>
                    )}
                </Form.Group>
    
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHanlder}
                        value={enteredEmail}
                    />
                    {(props.showEmailErrorMessage || EmailInputHasError) && (
                     <p className='error-text'>Please enter a valid email with @.</p>
                    )}
                </Form.Group>
                
                <Button variant="outline-primary" type="submit" disabled={!formIsValid || props.callLoading}>
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