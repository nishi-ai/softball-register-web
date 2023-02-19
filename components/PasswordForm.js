import { React } from "react";

import styles from "./Form.module.css";
import useInput from "../hooks/use-input";
import Loader from "./Loader";

function PasswordForm(props) {
  // use hook useInput
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    ref: inputPassword,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHanlder: passwordBlurHanlder,
    reset: resetTouchedPasswordField,
  } = useInput((value) => value.trim() !== "");

  // to manage overall form validity
  const formIsValid = enteredPasswordIsValid;

  const submitHandler = (event) => {
    // prevent the browser default of senfing a request,  to allow to fully handle the submission
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    // Rest API to send server & DB
    const passwordObject = {
      password: enteredPassword,
    };
    console.log(">>>entered Password:", passwordObject.password);

    sessionStorage.setItem("storedPassword", passwordObject.password);

    props.getPlayersDataHandler(passwordObject.password);
    // reset states
    resetTouchedPasswordField();
  };

  return (
    <div className={styles.formContaier}>
      {props.iscallLoading ? (
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
          className='d-grid gap-3'
        >
          <div className='form-group'>
            <label htmlFor='playername'></label>
            <input
              type='password'
              className={`form-control ${styles.formInput}`}
              id='password'
              placeholder='password'
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHanlder}
              value={enteredPassword}
              ref={inputPassword}
            />
            {props.showPasswordErrorMessage && (
              <p className={styles.errorText}>Please enter a valid password</p>
            )}
          </div>
          <button
            variant='outline-warning'
            type='submit'
            disabled={!formIsValid || props.iscallLoading}
            className='btn btn-outline-warning'
          >
            <span>Enter</span>
          </button>{" "}
        </form>
      )}
    </div>
  );
}

export default PasswordForm;
