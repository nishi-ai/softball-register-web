import React from "react";
import styles from "./Form.module.css";
import useInput from "../hooks/use-input";
import Loader from "./Loader";
import { Player } from "../types";

function AddPlayerForm(props: {
  callLoading: boolean;
  onAddPlayer: (player: Player) => Promise<void>;
  showNameErrorMessage: boolean;
  showEmailErrorMessage: boolean;
  showDupliEmailErrorMessage: boolean;
}) {
  // use hook useInput
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    ref: inputName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHanlder: nameBlurHanlder,
    reset: resetTouchedNameField,
  } = useInput((value: string) => value.trim() !== "" && value.length >= 2);

  const mailformat = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
  const isMatched = (value: string) => {
    if (value != "") {
      const isValidated = value.match(mailformat);
      if (isValidated != null) {
        return true;
      } else return false;
    } else return false;
  };
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: EmailInputHasError,
    ref: inputEmail,
    valueChangeHandler: emailChangeHandler,
    inputBlurHanlder: emailBlurHanlder,
    reset: resetTouchedEmailField,
  } = useInput((value: string) => isMatched(value));

  // to manage overall form validity
  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const hasNameInputError = props.showNameErrorMessage || nameInputHasError;
  const hasEmailInputError = props.showEmailErrorMessage || EmailInputHasError;

  // to manage dupli email input
  const dupliEmailEntered = props.showDupliEmailErrorMessage;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
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
          data-as='span'
          data-animation='border'
          data-size='sm'
          data-role='status'
          aria-hidden='true'
        />
      ) : (
        <form
          noValidate
          onSubmit={submitHandler}
          data-validated={formIsValid.toString()}
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
            data-variant='outline-warning'
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
