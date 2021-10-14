import { React } from 'react';
// directly access to reference cue DOM elements
import { Form, Button, Spinner } from 'react-bootstrap';

import useInput from '../hooks/use-input'

function PasswordForm(props) {
    // use hook useInput
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        ref: inputPassword,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHanlder: passwordBlurHanlder,
        reset: resetTouchedPasswordField
    } = useInput(value => value.trim() !== '');

    // to manage overall form validity
    const formIsValid = enteredPasswordIsValid

    const submitHandler = (event) => {
        // prevent the browser default of senfing a request,  to allow to fully handle the submission
        event.preventDefault();

        if (!formIsValid) {
            return;
        }    
        // Rest API to send server & DB
        const passwordObject = {
            password: enteredPassword
        };
        console.log(passwordObject.password)
        props.getPasswordHandler(passwordObject);
        // reset states
        resetTouchedPasswordField();
    };

        return (
            <Form noValidate onSubmit={submitHandler} validated={!props.showPasswordErrorMessage}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='playername'>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        placeholder="***"
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHanlder}
                        value={enteredPassword}
                        ref={inputPassword}
                    />
                    {(props.showPasswordErrorMessage) && (
                     <p className='error-text'>
                         Please enter a valid password
                    </p>
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
                <span>Enter</span>
                </Button>{' '}
            </Form>
        );
}

export default PasswordForm;