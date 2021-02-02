import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./HomePagination.css";

import Navbar from "../components/navbar/Navbar";
import PostCard from "../components/card/Card";
import { SearchBox } from "../components/searchbox/SearchBox";

// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";

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
// -----------INLINE STYLES--------
const searchContainerStyle = {
  width: "100%",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "30px",
};
const paginationContainerStyle = {
  width: "100%",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "60px",
};
// ---------MAIN FUNCTION----------
function Home() {
  const [postList, setPostList] = useState([]);
  // const [nextURL, setNextURL] = useState("");
  const classes = useStyles();

  // -------for pagination---------
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);

  // --------fetch data------------
  const fetchData = async (
    postListURL = "https://fs-blog-backend.herokuapp.com/api/post-list/"
  ) => {
    try {
      const result = await axios.get(postListURL);
      // setPostList([...postList, ...result?.data?.results]);
      const data = result?.data;
      setPageCount(Math.ceil(data.length / perPage));
      const slice = data.slice(offset, offset + perPage);
      setPostList(slice);
      // setPostList([...postList, ...result?.data]);
      // setNextURL(result?.data?.next);
    } catch ({ response }) {
      if (response) {
        console.log("No data");
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  // const handleLoadMore = () => {
  //   fetchData(nextURL);
  // };

  // -----------------RETURN------------------
  return !postList?.length ? (
    <div>
      <Navbar />
      <div style={searchContainerStyle}>
        <SearchBox />
      </div>
      <LoopCircleLoading />
    </div>
  ) : (
    <div style={{ backgroundColor: "#d9dab0" }}>
      <Navbar />
      <div style={searchContainerStyle}>
        <SearchBox />
      </div>
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
      <div style={paginationContainerStyle}>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>

      {/* <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="#d9dab0">
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
      </Box> */}
    </div>
  );
}

export default Home;
