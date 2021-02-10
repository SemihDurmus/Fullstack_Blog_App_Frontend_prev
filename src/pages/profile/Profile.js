import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { LoopCircleLoading } from "react-loadingg";

import Navbar from "../../components/navbar/Navbar";
import EditModal from "./EditModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(5),
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  media: {
    height: "35vh",
    border: "2px solid black",
    borderRadius: "15px",
  },
  bioContainer: {
    marginBottom: "0.8rem",
    backgroundColor: "#c3c7c7",
    padding: "0.5rem",
    borderRadius: "15px",
  },
}));

export default function ProfilePage() {
  let history = useHistory();
  const [profile, setProfile] = useState([]);
  const classes = useStyles();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `http://fs-blog-backend.herokuapp.com/user/profile`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? "Token " + token : null,
          },
        }
      );
      setProfile(result.data);
      console.log(result.data);
    } catch ({ response }) {
      if (response) {
        console.log("No data");
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !profile.user?.length ? (
    <div>
      <Navbar />
      <LoopCircleLoading />
    </div>
  ) : (
    <div
      style={{
        backgroundColor: "#f6f5f5",
        height: "98vh",
        width: "auto",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Grid container className={classes.root} spacing={5} justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={5}>
            <Grid container justify="center" style={{ marginBottom: "0.8rem" }}>
              <h2>
                <span style={{ textTransform: "capitalize" }}>
                  {profile.user}
                </span>
                's Profile
              </h2>
            </Grid>
            <Grid container justify="center" style={{ marginBottom: "0.8rem" }}>
              <img
                src={profile.image}
                alt="ProfilePicture"
                className={classes.media}
              />
            </Grid>
            <Grid
              container
              xs={10}
              justify="center"
              className={classes.bioContainer}
            >
              <p
                style={{
                  textIndent: "40px",
                  textTransform: "capitalize",
                  alignSelf: "stretch",
                }}
              >
                {profile.bio}
              </p>
            </Grid>
            <Grid container xs={10} justify="center">
              <Box
                display="flex"
                justifyContent="center"
                m={1}
                p={1}
                bgcolor="#f6f5f5"
              >
                <Box
                  p={1}
                  style={{ backgroundColor: "#f6f5f5", marginRight: "1rem" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => null}
                    style={{ marginLeft: "1.5rem" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.goBack()}
                    style={{ marginLeft: "1rem" }}
                  >
                    Back
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid container xs={10} justify="center">
              <Box
                display="flex"
                justifyContent="center"
                m={1}
                p={1}
                bgcolor="#f6f5f5"
              >
                <Box
                  p={1}
                  style={{ backgroundColor: "#f6f5f5", marginRight: "1rem" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => null}
                    style={{ marginLeft: "1.5rem" }}
                  >
                    Stats Icon
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => null}
                    style={{ marginLeft: "1rem" }}
                  >
                    Stories Icon
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
