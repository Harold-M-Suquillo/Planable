import ReactDOM from "react-dom";
import React, { useState, useContext, useEffect, useMemo } from "react";
import { AppBar, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deepPurple } from '@mui/material/colors';
import Slide from '@mui/material/Slide';
import { AuthContext } from "../../Contexts/AuthContextProvider";
import Container from "@mui/material/Container";
const settings = ["Profile", "Account", "Dashboard"];
const tabs = ["Planable", "Projects", "Bug Tracker"];

const NavBar = (props) => {
    const authCtx = useContext(AuthContext);
    const [anchorElUser, setAnchorElUser] = useState(null); // keep track of current window/closed/open


    const handleNavigationChange = (event, newValue) => {
        // Change the current tab target
        if (newValue) {
            props.onPageChange(newValue);
        }
    };

    const handleOpenUserMenu = (event) => {
        // Open the Menu
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        // Close the Menu
        setAnchorElUser(null);
    };

    const handleOptionChange = (event) => {
        // Handle Option Change
        handleCloseUserMenu(event);
    };

    const createTabs = useMemo(() => {
        return tabs.map((tab, index) => {
            const name = tab.replace(/ /g, "-");
            return (
                <Tab
                    sx={{ color: "white" }}
                    key={name+index}
                    value={name}
                    label={name}
                    disabled={!!index && !authCtx.isLoggedIn}
                ></Tab>
            );
        });
    }, [authCtx.isLoggedIn]);

    const navContent = (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ background: '#0A0A0A' }} position="fixed">
                <Toolbar>
                    {/* Icon/Title */}
                    <EngineeringOutlinedIcon
                        fontSize="large"
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{ flexGrow: 1 }}
                    >
                        Planable
                    </Typography>

                    {/* Page Navigation */}
                    <Tabs
                        sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
                        value={props.page}
                        TabIndicatorProps={{style: {backgroundColor: "white"}}}
                        onChange={handleNavigationChange}
                        textColor="inherit"
                        aria-label="white tabs example"
                    >
                        {createTabs}
                    </Tabs>

                    {/* Login Button */}
                    {!authCtx.isLoggedIn && (
                        <Button
                            size="small"
                            onClick={props.onLogin}
                            sx={{ width: 100, mr:6.5}}
                            variant="outlined"
                            color="inherit"
                            startIcon={<LoginIcon />}
                        >
                            {" "}
                            Login{" "}
                        </Button>
                    )}

                    {/* Logout Button */}
                    {authCtx.isLoggedIn && (
                        <Button
                            size="small"
                            onClick={() => {
                                authCtx.authenticate("logout");
                            }}
                            sx={{ width: 100 }}
                            variant="outlined"
                            color="inherit"
                            startIcon={<LogoutIcon />}
                        >
                            {" "}
                            Logout{" "}
                        </Button>
                    )}

                    {/* Profile Icon and dropdown */}
                    {authCtx.isLoggedIn && (
                        <Slide direction="left" mountOnEnter in={authCtx.isLoggedIn} unmountOnExit>
                            <Box sx={{ flexGrow: 0, ml: 1.5 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            sx={{ bgcolor: deepPurple['A400'] }}
                                            src="../../public/logo192.png"
                                        />
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={handleOptionChange}
                                        >
                                            <Typography textAlign="center">
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Slide>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
    return (
        <>
            {ReactDOM.createPortal(
                navContent,
                document.getElementById("navbar")
            )}
        </>
    );
};
export default React.memo(NavBar) ;
