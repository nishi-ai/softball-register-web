import { useRef, useState } from "react";

// check name and emai are valid or not(value: boolean) => void
const useInput = (validateValue: any) => {
  // whenever one of these states changes, this component function gets re-rendered
  const [enteredValue, setEnteredValue] = useState<string>("");

  // set input field was touched, so the error message can be already shown before submitting and prevent not show before entering input
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid = validateValue(enteredValue);

  // once submitted clicked, all inputs are treated as touched, whatever they are valid or not
  const hasError = !valueIsValid && isTouched;

  const inputRef = useRef<HTMLInputElement>(null);

  const valueChangeHandler = () => {
    setEnteredValue(inputRef.current!.value);
  };

  // prevent input from losing and show errors at every editting
  const inputBlurHanlder = () => {
    // input field is touched once
    setIsTouched(true);
  };

  // reset the touched state to false once submitted
  const reset = () => {
    setIsTouched(false);
  };

  // can be called from the components that use the hook
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    ref: inputRef,
    valueChangeHandler,
    inputBlurHanlder,
    reset,
  };
};

const emailFormat = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

export const isMatched = (value: string, format = emailFormat) => {
  if (value != "") {
    const isValidated = value.match(format);
    if (isValidated != null) {
      return true;
    } else return false;
  } else return false;
};

export default useInput;
