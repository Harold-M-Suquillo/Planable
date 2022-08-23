import React, { useState, useCallback } from 'react';
import { LoginDiaglog } from './LoginDialog';
import NavBar from './NavBar'

// This Component is the Overall wrapper to the Navbar and the login/signup modal
const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Open and close the login/signup modal
    const handleClickOpen = useCallback(() => {
        setIsModalOpen(true);
    }, [] );
    
    const handleClickClose = () => {
        setIsModalOpen(false);
    };


    return(
        <>
            <NavBar onLogin={handleClickOpen}/>
            {isModalOpen && <LoginDiaglog isOpen={isModalOpen} onClose={handleClickClose} />}
        </>
    );

};

export { Header };