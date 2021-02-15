import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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

// -------------MAIN FUNCTION-------------
export default function Navbar() {
  const history = useHistory();
  const {
    token,
    setToken,
    setKeyword,
    setSelectedOption,
    categoryDisplay,
    setStoriesOpen,
  } = useContext(Context);
  const [image, setImage] = useState("");

  const classes = useStyles();

  const handleProfileOpen = () => {
    history.push("/profile");
    setStoriesOpen(false);
  };

  const handleMainPage = () => {
    const resetSearchSettings = () => {
      setKeyword("");
      setSelectedOption(categoryDisplay.map((e) => e.value));
    };
    resetSearchSettings();
    history.push("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    alert("You successfully logged out.");
    history.push("/home");
  };

  const fetchUserProfile = async (
    profilePath = `https://fs-blog-backend.herokuapp.com/user/profile/`
  ) => {
    try {
      const result = await axios.get(profilePath, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? "Token " + token : null,
        },
      });
      setImage(result?.data?.image);
      console.log("Profile info fetched");
    } catch ({ response }) {
      if (response) {
        console.log("No data");
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
                  <Avatar
                    alt="User Avatar"
                    src={image}
                    className={classes.small}
                  />
                </IconButton>
                <Button onClick={handleLogout} color="inherit">
                  <ExitToAppIcon fontSize="large" />
                </Button>
              </div>
            ) : (
              <>
                <Button onClick={() => history.push("/")} color="inherit">
                  Login
                </Button>
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
