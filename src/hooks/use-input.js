import { useRef, useState } from "react";

// check name and emai are valid or not
const useInput = (validateValue) => {
    // whenever one of these states changes, this component function gets re-rendered
    const [enteredValue, setEnteredValue] = useState('');

    // set input field was touched, so the error message can be already shown before submitting and prevent not show before entering input
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);

    // once submitted clicked, all inputs are treated as touched, whatever they are valid or not
    const hasError = !valueIsValid && isTouched;

    const inputRef = useRef()

    const valueChangeHandler = (e) => {
        setEnteredValue(inputRef.current.value);
    }

    // prevent input from losing and show errors at every editting
    const inputBlurHanlder = (e) => {
        // input field is touched once
        setIsTouched(true);
    }

    // reset the touched state to false once submitted
    const reset = () => {
        setIsTouched(false)
    }

    // can be called from the components that use the hook
    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        ref: inputRef,
        valueChangeHandler,
        inputBlurHanlder,
        reset
    };
};

export default useInput;