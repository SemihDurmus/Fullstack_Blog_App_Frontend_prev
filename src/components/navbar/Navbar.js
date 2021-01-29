import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

import MenuListComposition from "./NavbarMenuList";
import { Context } from "../../context/Context";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    "& .MuiToolbar-gutters": {
      paddingLeft: 5,
      paddingRight: 20,
    },
    backgroundColor: theme.palette.secondary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    cursor: "pointer",
  },
}));

export default function Navbar() {
  const history = useHistory();
  const { token, setToken } = useContext(Context);
  const [profile, setProfile] = useState([]);

  const classes = useStyles();

  const handleProfileOpen = () => {
    history.push("/profile");
  };

  const handleMainPage = () => {
    history.push("/home");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    history.push("/home");
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#719fb0" }}>
          <MenuListComposition />
          <Typography
            className={classes.title}
            variant="h5"
            onClick={handleMainPage}
            noWrap
          >
            Blog
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {token ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleProfileOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            ) : (
              <>
                <Button onClick={() => history.push("/")} color="inherit">
                  Register
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
