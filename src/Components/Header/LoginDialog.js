import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const LoginDiaglog = (props) => {
    const [request, setRequest] = useState('Login');

    const changeRequestHandler = () =>{
        setRequest( (prevState) =>{
            return (prevState === 'Login')? 'Create': 'Login';
        });
    };

    let buttonText = 'Create an Account';
    let requestHeader = 'Login';
    if (request === 'Create'){
        buttonText = 'Login';
        requestHeader = "Create An Account"
    }


    return (
        <Dialog open={props.isOpen} onClose={props.onClose} fullWidth maxWidth="sm">
            <DialogTitle>{requestHeader}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={props.onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <TextField
                    autoFocus
                    id="email" 
                    label="Email" 
                    variant="standard"
                    type="email"
                    margin="dense"
                    fullWidth
                />
                <TextField 
                    id="standard-basic"
                    label="Password" 
                    variant="standard"
                    type="password"
                    margin="normal"
                    fullWidth
                />
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
            <DialogActions>
                <Button sx={{ width: 95 }} variant="contained" onClick={props.onClose}>{request}</Button>
                <Button sx={{ width: 95 }} variant="outlined" onClick={props.onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export { LoginDiaglog };