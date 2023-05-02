import { useState } from "react";
import useInput, { isMatched } from "../hooks/use-input";
import styles from "../components/Form.module.css";
import Loader from "../components/Loader";

export default function Unsubscribe() {
  const [isLoading, setIsLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const {
    value: enteredEmail,
    isValid,
    hasError: emailInputHasError,
    ref: inputEmail,
    valueChangeHandler: emailChangeHandler,
    inputBlurHanlder: emailBlurHanlder,
  } = useInput((value: string) => isMatched(value));

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    const body = {
      email: enteredEmail,
    };
    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Unsubscribing is failed.");
      }
      setIsLoading(false);
      setFinished(true);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "350px", marginTop: "70px" }}>
      {!finished ? (
        <div id="form">
          I unsubscribe from the mailing list for future events.
          {isLoading ? (
            <Loader
              data-as="span"
              data-animation="border"
              data-size="sm"
              data-role="status"
              aria-hidden="true"
            />
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  className={`form-control ${styles.formControl}`}
                  id="email"
                  placeholder="email@example.com"
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHanlder}
                  value={enteredEmail}
                  ref={inputEmail}
                />
                {emailInputHasError && (
                  <p className={styles.errorText}>
                    Please enter a valid email with @ and your domain.
                  </p>
                )}
              </div>
              <button
                style={{ width: "100%" }}
                data-variant="outline-warning"
                type="submit"
                className="btn btn-outline-warning mt-4"
                disabled={isLoading || !isValid}
                onClick={handleUnsubscribe}
              >
                <span>Unsubscribe</span>
              </button>
            </>
          )}
        </div>
      ) : (
        "Successfully unsubscribed"
      )}
    </div>
  );
}
