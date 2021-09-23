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
        ref: inputName,
        valueChangeHandler: nameChangeHandler,
        inputBlurHanlder: nameBlurHanlder,
        reset: resetTouchedNameField
    } = useInput(value => value.trim() !== '' && value.length >= 2);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: EmailInputHasError,
        ref: inputEmail,
        valueChangeHandler: emailChangeHandler,
        inputBlurHanlder: emailBlurHanlder,
        reset: resetTouchedEmailField
    } = useInput(value => value.includes('@'));

    // to manage overall form validity
    const formIsValid = enteredNameIsValid && enteredEmailIsValid
    
    // to manage dupli email input
    const dupliEmailEntered = props.showDupliEmailErrorMessage

    const submitHandler = (event) => {
        // prevent the browser default of senfing a request,  to allow to fully handle the submission
        event.preventDefault();

        if (!formIsValid) {
            return;
        }
             
        // Rest API to send server & DB
        const playerData = {
            name: enteredName,
            email: enteredEmail
        };

        props.onAddPlayer(playerData);

        // reset states
        resetTouchedNameField();
        resetTouchedEmailField();
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
                        ref={inputName}
                    />
                    {(props.showNameErrorMessage || nameInputHasError) && (
                     <p className='error-text'>
                         Please enter at least 2 chars
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
                        ref={inputEmail}
                    />
                    {(props.showEmailErrorMessage || EmailInputHasError) && (
                     <p className='error-text'>Please enter a valid email with @.</p>
                    )}
                     {(dupliEmailEntered) && (
                    <p className='error-text'>This email is already taken.</p>
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