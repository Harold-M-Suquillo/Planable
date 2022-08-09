import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    logout: (token) => {},
    login: () =>{}
});

const AuthContextProvider = (props) => {
    const [token, setToken] = useState('');
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        // Check if token in local storage
        // Else loggin and save token to local storage
        setToken(token);
    };

    const logoutHandler = () => {

        // Remove the value from local storage
        setToken(null);
    };

    return(
        <AuthContext.Provider
            value={{
                token: token,
                isLoggedIn: userIsLoggedIn,
                login: loginHandler,
                logout: logoutHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

};
export { AuthContextProvider, AuthContext }; 
