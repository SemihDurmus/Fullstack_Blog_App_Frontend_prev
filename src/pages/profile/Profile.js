import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { LoopCircleLoading } from "react-loadingg";

import { Context } from "../../context/Context";
import Navbar from "../../components/navbar/Navbar";
import EditModal from "./EditModal";
import Stats from "../../components/stats/Stats";
import Stories from "../../components/stories/Stories";

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
    boxShadow: "3px 3px 4px #555",
    borderRadius: "15px",
  },
  bioContainer: {
    margin: "1rem auto",
    backgroundColor: "#dfe4ea",
    padding: "0.8rem",
    lineHeight: "1.5rem",
    borderRadius: "10px",
    minWidth: "300px",
    height: "200px",
    overflow: "scroll",
    boxShadow: "3px 3px 4px #555",
  },
}));

//---------MAIN FUNCTION------------------------
export default function ProfilePage() {
  const { storiesOpen, setStoriesOpen } = useContext(Context);

  let history = useHistory();
  const [profile, setProfile] = useState([]);
  const classes = useStyles();

  //----------Modal------------------------
  const [open, setOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  //----------Fetch Profile Data------------
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

  //-------------Refresh-------------------
  const refresh = () => {
    window.location.reload(false);
  };

  //-------------Return--------------------
  return !profile.user?.length ? (
    <div>
      <Navbar />
      <LoopCircleLoading />
    </div>
  ) : storiesOpen ? (
    <div>
      <Navbar />
      <Stories />
    </div>
  ) : (
    <div
      style={{
        backgroundColor: "#f6f5f5",
        width: "auto",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Grid container className={classes.root} spacing={5} justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={5}>
            <Grid container justify="center" style={{ marginBottom: "0.8rem" }}>
              <h2 style={{ margin: "2rem auto" }}>
                <span style={{ textTransform: "capitalize" }}>
                  {profile.user}
                </span>
                's Profile Page
              </h2>
            </Grid>
            <Grid container justify="center" style={{ marginBottom: "0.8rem" }}>
              <img
                src={profile.image}
                alt="ProfilePicture"
                className={classes.media}
              />
            </Grid>

            <Grid container justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStatsOpen(true)}
                style={{ width: "8rem", margin: "0.5rem" }}
              >
                <EqualizerIcon fontSize="small" />
                &nbsp; Stats
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStoriesOpen(true)}
                style={{ width: "8rem", margin: "0.5rem" }}
              >
                <MenuBookIcon fontSize="small" />
                &nbsp; Stories
              </Button>
            </Grid>
            <Grid
              container
              xs={6}
              justify="center"
              className={classes.bioContainer}
            >
              <p
                style={{
                  textIndent: "30px",
                  alignSelf: "stretch",
                  textAlign: "justify",
                }}
              >
                {profile.bio}
              </p>
            </Grid>
            <Grid container justify="center">
              <EditModal
                open={open}
                setOpen={setOpen}
                profile={profile}
                refresh={refresh}
              />
            </Grid>
            <Grid container justify="center">
              <Stats open={statsOpen} setOpen={setStatsOpen} />
            </Grid>
            <Grid container xs={10} justify="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
                style={{ width: "8rem", margin: "0.5rem" }}
              >
                <ArrowBackIosIcon fontSize="small" />
                &nbsp; Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                style={{ width: "8rem", margin: "0.5rem" }}
              >
                <EditIcon fontSize="small" />
                &nbsp; Edit
              </Button>
            </Grid>
          </Grid>
          <Stats />
        </Grid>
      </Grid>
    </div>
  );
}
