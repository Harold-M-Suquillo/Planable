import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useInput } from "../../Utils/useInput";
import { AuthContext } from "../../Utils/AuthContextProvider";

// This component is the login/signup modal/form
const LoginDiaglog = (props) => {
    const authCtx = useContext(AuthContext);
    // Track the request type (Login/Signup)
    const [request, setRequest] = useState("login");

    // password input
    const {
        value: enteredPassword,
        hasError: passwordInputHasError,
        ValueInputChangeHandler: passwordChangeHandler,
        ValueInputBlurHandler: passwordBlurHandler,
        valueIsValid: passwordInputIsValid,
    } = useInput((input) =>
        input.match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&/? "]).*$/)
    );

    // email input
    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        ValueInputChangeHandler: emailChangeHandler,
        ValueInputBlurHandler: emailBlurHandler,
        valueIsValid: emailInputIsValid,
    } = useInput((input) => input.match(/^\S+@\S+\.\S+$/));

    // Check if the overall form is valid
    let formIsValid = false;
    if (passwordInputIsValid && emailInputIsValid) {
        formIsValid = true;
    }

    // Handles the user submitting the form
    const formSubmissionHandler = (e) => {
        e.preventDefault();
        // Checks the type of request the user wants to make
        authCtx.authenticate(request, {email: enteredEmail, password: enteredPassword}, props.onClose)
        // Only close the modal if therre is no error
    };




    // Handle user changing request type login/create account
    const changeRequestHandler = () => {
        setRequest((prevState) => {
            return prevState === "login" ? "signup" : "login";
        });
    };

    // Handle the form text
    let buttonText = "Create an Account";
    let requestHeader = "Login";
    if (request === "signup") {
        buttonText = "Login instead";
        requestHeader = "Create An Account";
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{requestHeader}</DialogTitle>

            {/* close Button */}
            <IconButton
                aria-label="close"
                onClick={props.onClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>

            {/* email/password form */}
            <form onSubmit={formSubmissionHandler}>
                <DialogContent dividers>
                    <TextField
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        error={emailInputHasError}
                        helperText={
                            emailInputHasError ? "Email is not valid" : " "
                        }
                        id="email"
                        label="Email"
                        variant="standard"
                        type="email"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        error={passwordInputHasError}
                        helperText={
                            passwordInputHasError
                                ? "password must contain at least 8 characters including 1 number, 1 letter and 1 unique character"
                                : " "
                        }
                        id="standard-basic"
                        label="Password"
                        variant="standard"
                        type="password"
                        margin="normal"
                        fullWidth
                    />
                    {/* create/login Button */}
                    <Button
                        size="small"
                        variant={"text"}
                        color={"success"}
                        fullWidth={true}
                        onClick={changeRequestHandler}
                    >
                        {buttonText}
                    </Button>
                </DialogContent>

                {/* Send Request & Cancel Button */}
                <DialogActions>
                    <Button
                        sx={{ width: 95 }}
                        type="submit"
                        variant="contained"
                        disabled={!formIsValid}
                    >
                        {request}
                    </Button>
                    <Button
                        sx={{ width: 95 }}
                        variant="outlined"
                        onClick={props.onClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export { LoginDiaglog };
