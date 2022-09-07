import React, { useState, useEffect } from "react";
import { useHttp } from "./useHttp";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    authenticate: () => {},
});

const AuthContextProvider = (props) => {
    const [token, setToken] = useState("");
    const userIsLoggedIn = !!token;

    // -------- User Authentication -------------
    const { isLoading: isAuthLoading, sendRequest: sendAuthRequest } = useHttp();

    // Check if token in localStorage is valid
    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        const abortController = new AbortController();
        if (localStorageToken) {
            sendAuthRequest(
                {
                    url: "http://127.0.0.1:8000/login/test-token",
                    method: "POST",
                    headers: { Authorization: `Bearer ${localStorageToken}` },
                    signal: abortController.signal,
                    response: false,
                },
                (data) => {
                    // TODO: Retrieve user data from database
                    setToken(localStorageToken);
                }
            );
        }
        return () => {
            abortController.abort();
        };
    }, [sendAuthRequest]);

    // Login the user
    const loginHandler = async (email, password, callback = null) => {
        if (!token) {
            let formData = new FormData();
            formData.append("username", email);
            formData.append("password", password);
            sendAuthRequest(
                {
                    url: "http://127.0.0.1:8000/login",
                    method: "Post",
                    body: formData,
                    response: {
                        message: "Login Sucessful!",
                        variant: "success",
                    },
                },
                // Set the token into local storage
                (response) => {
                    if (callback) {
                        callback();
                    }
                    setToken(response.access_token);
                    localStorage.setItem("token", response.access_token);
                }
            );
        }
    };

    // Logout
    const logoutHandler = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const signupHandler = async (email, password, callback = null) => {
        console.log(email, password);
        sendAuthRequest(
            {
                url: "http://127.0.0.1:8000/signup",
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password}),
                response: {
                    message: "Account Creation Successful!",
                    variant: "success",
                },
            },
            // Set the token into local storage
            (response) => {
                if (callback) {
                    callback();
                }
                setToken(response.access_token);
                localStorage.setItem("token", response.access_token);
            }
        );
    };

    const authenticate = (request, payload = {}, closeModal = null) => {
        switch (request) {
            case "login":
                loginHandler(payload.email, payload.password, closeModal);
                break;
            case "signup":
                signupHandler(payload.email, payload.password, closeModal);
                break;
            case "logout":
                logoutHandler();
                break;
            default:
                break;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token: token,
                isLoggedIn: userIsLoggedIn,
                authenticate,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
export { AuthContextProvider, AuthContext };
