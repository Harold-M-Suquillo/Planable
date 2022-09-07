import { useState } from 'react';


const useInput = (validateValueHandler) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValueHandler(enteredValue);

    // if the input has been touched and value is not Valid -> error
    const hasError = isTouched && !valueIsValid;

    const ValueInputChangeHandler = (e) =>{
        setEnteredValue(e.target.value);
    };

    const ValueInputBlurHandler = () =>{
        setIsTouched(true);
    };

    const reset = () =>{
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        hasError,
        ValueInputChangeHandler,
        ValueInputBlurHandler,
        valueIsValid,
        reset,
    }
};

export { useInput };