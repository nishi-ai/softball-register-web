import { React } from "react";

import styles from "./Form.module.css";
import useInput from "../hooks/use-input";
import Loader from "./Loader";

function AddPlayerForm(props) {
  // use hook useInput
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    ref: inputName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHanlder: nameBlurHanlder,
    reset: resetTouchedNameField,
  } = useInput((value) => value.trim() !== "" && value.length >= 2);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: EmailInputHasError,
    ref: inputEmail,
    valueChangeHandler: emailChangeHandler,
    inputBlurHanlder: emailBlurHanlder,
    reset: resetTouchedEmailField,
  } = useInput((value) => value.includes("@") && value.includes("."));

  // to manage overall form validity
  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const hasNameInputError = props.showNameErrorMessage || nameInputHasError;
  const hasEmailInputError = props.showEmailErrorMessage || EmailInputHasError;

  // to manage dupli email input
  const dupliEmailEntered = props.showDupliEmailErrorMessage;

  const submitHandler = (event) => {
    // prevent the browser default of senfing a request,  to allow to fully handle the submission
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // Rest API to send server & DB
    const playerData = {
      name: enteredName,
      email: enteredEmail,
    };

    props.onAddPlayer(playerData);

    // reset states
    resetTouchedNameField();
    resetTouchedEmailField();
  };

  return (
    <div>
      {props.callLoading ? (
        <Loader
          as='span'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
        />
      ) : (
        <form
          noValidate
          onSubmit={submitHandler}
          validated={formIsValid.toString()}
          className='d-flex flex-column'
        >
          <div className='form-group'>
            <label htmlFor='playername'></label>
            <input
              type='name'
              className={`form-control ${styles.formControl}`}
              id='name'
              placeholder='Name'
              onChange={nameChangeHandler}
              onBlur={nameBlurHanlder}
              value={enteredName}
              ref={inputName}
            />
            {hasNameInputError && (
              <p className={styles.errorText}>Please enter at least 2 chars</p>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='email'></label>
            <input
              type='email'
              className={`form-control ${styles.formControl}`}
              id='email'
              placeholder='email@example.com'
              onChange={emailChangeHandler}
              onBlur={emailBlurHanlder}
              value={enteredEmail}
              ref={inputEmail}
            />
            {hasEmailInputError && (
              <p className={styles.errorText}>
                Please enter a valid email with @ and your domain.
              </p>
            )}
            {dupliEmailEntered && !hasEmailInputError && (
              <p className={styles.errorText}>This email is already taken.</p>
            )}
          </div>
          <button
            variant='outline-warning'
            type='submit'
            className='btn btn-outline-warning mt-4'
            disabled={!formIsValid || props.callLoading}
          >
            <span>Register</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default AddPlayerForm;
