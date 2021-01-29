import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
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

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    history.push("/profile");
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMainPage = () => {
    history.push("/home");
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    history.push("/home");
    setAnchorEl(null);
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
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  style={{ marginTop: "3.2rem" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={handleProfileMenuOpen}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
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
