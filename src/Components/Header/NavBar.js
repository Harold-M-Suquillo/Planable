import ReactDOM from 'react-dom';
import React, { useState, useContext, useEffect } from "react";
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
import { AuthContext } from "../../AuthContextProvider";

const settings = ["Profile", "Account", "Dashboard"];

const NavBar = (props) => {
  const AuthCtx = useContext(AuthContext);
  const [value, setValue] = useState("Planable"); // Keep track of current tab
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Have the slider move back to original value
  useEffect( () => {
    setValue('Planable');
  }, [AuthCtx.token]);



  const handleNavigationChange = (event, newValue) => {
    // Change the current tab target
    if (newValue) {
      console.log(newValue);
      setValue(newValue);
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



  const navContent = (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#2E3B55" }} position="fixed">
        <Toolbar>
          {/* Icon/Title */}
          <EngineeringOutlinedIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Planable
          </Typography>

          {/* Page Navigation */}
          <Tabs
            sx={{ display: { xs: "none", md: "flex" }, mr: 5 }}
            value={value}
            onChange={handleNavigationChange}
            textColor="white"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="Planable" label="Planable"/>
            <Tab value="Projects" label="Projects" disabled={!AuthCtx.isLoggedIn}/>
            <Tab value="Bug Tracker" label="Bug Tracker" disabled={!AuthCtx.isLoggedIn}/>
            <Tab value="Item Three" label="Item Three" disabled={!AuthCtx.isLoggedIn}/>
          </Tabs>

          {/* LogIn/LogOut */}
          {!AuthCtx.isLoggedIn && (
            <Button
              onClick={props.onLogin}
              sx={{ width: 120 }}
              variant="outlined"
              color="inherit"
              startIcon={<LoginIcon />}
            >
              {" "}
              Login{" "}
            </Button>
          )}
          {AuthCtx.isLoggedIn && (
            <Button
              onClick={AuthCtx.logout}
              sx={{ width: 120 }}
              variant="outlined"
              color="inherit"
              startIcon={<LogoutIcon />}
            >
              {" "}
              Logout{" "}
            </Button>
          )}
          {AuthCtx.isLoggedIn &&
            <Box sx={{ flexGrow: 0, ml: 1.5 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Harold Suquillo" src="../../public/logo192.png" />
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
                  <MenuItem key={setting} onClick={handleOptionChange}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }


        </Toolbar>
      </AppBar>
    </Box>

  );
  return (
    <>
      {ReactDOM.createPortal(navContent, document.getElementById('navbar'))
    }</>
  );
};
export { NavBar };
