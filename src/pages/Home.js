import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, Suspense, Spinner } from "react";
import Navbar from "../components/navbar/Navbar";
import PostCard from "../components/card/Card";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { LoopCircleLoading } from "react-loadingg";

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
}));

function Home() {
  const [postList, setPostList] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const classes = useStyles();

  const fetchData = async (
    postListURL = "http://fs-blog-app-backend-django.herokuapp.com/api/post-list/"
  ) => {
    try {
      const result = await axios.get(postListURL);
      setPostList([...postList, ...result?.data?.results]);
      setNextURL(result?.data?.next);
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

  const handleLoadMore = () => {
    fetchData(nextURL);
  };

  return !postList?.length ? (
    <div>
      <Navbar />
      <LoopCircleLoading />
    </div>
  ) : (
    <div style={{ backgroundColor: "#d9dab0" }}>
      <Navbar />
      <Grid container className={classes.root} spacing={5} justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={5}>
            {postList
              ? postList.map((item, id) => {
                  return <PostCard item={item} id={id} />;
                })
              : "No data available"}
          </Grid>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="#d9dab0">
        <Box p={1} style={{ backgroundColor: "#d9dab0" }}>
          {nextURL ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleLoadMore()}
            >
              View More
            </Button>
          ) : null}
        </Box>
      </Box>
    </div>
  );
}

export default Home;
