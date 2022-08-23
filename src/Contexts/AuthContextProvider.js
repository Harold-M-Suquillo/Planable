import React, { useState, useEffect } from "react";
import { useHttp } from "../Hooks/useHttp";


const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    authenticate: () => {},
});

const AuthContextProvider = (props) => {
    const [token, setToken] = useState("");
    const userIsLoggedIn = !!token;

    // -------- User Authentication -------------
    const {
        isLoading: isAuthLoading,
        sendRequest: sendAuthRequest,
    } = useHttp();

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
                    response: false
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
                        variant: "success"
                    }
                },
                (response) => {
                    if (callback){
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

    const signupHandler = (email, password) => {
        console.log("sign up for an account");
    };


    
    const authenticate = (request, payload = {}, callback = null) => {
        switch (request){
            case "login":
                loginHandler(payload.email, payload.password, callback);
                break;
            case "signup":
                signupHandler(payload.email, payload.password);
                break;
            case "logout":
                logoutHandler()
                break;
            default:
                break;
        }
    }



    return (
        <AuthContext.Provider
            value={{
                token: token,
                isLoggedIn: userIsLoggedIn,
                authenticate
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
export { AuthContextProvider, AuthContext };
