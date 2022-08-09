import React, { useState } from 'react';
import { LoginDiaglog } from './LoginDialog';
import { NavBar } from './NavBar'

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClickOpen = () => {
        setIsModalOpen(true);
    };

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