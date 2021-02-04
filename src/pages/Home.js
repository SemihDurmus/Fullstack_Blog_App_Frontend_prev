import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./HomePagination.css";

import Navbar from "../components/navbar/Navbar";
import PostCard from "../components/card/Card";
import { SearchBox } from "../components/searchbox/SearchBox";
import { CategoryDropDown } from "../components/categorydropdown/CategoryDropDown";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { LoopCircleLoading } from "react-loadingg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(5),
    },
    minHeight: "70vh",
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
  backgroundColor: "#f6f5f5",
};
const buttonStyle = {
  padding: "10px",
  outline: "none",
};

// ---------MAIN FUNCTION----------
function Home() {
  const [postDisplayList, setPostDisplayList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataWithPagination, setFilteredDataWithPagination] = useState(
    []
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const classes = useStyles();
  const history = useHistory();

  // -------for pagination---------
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);

  //-----------filter data---------
  const filterPosts = (keyword, data) => {
    const filterPostList = data.filter((item) => {
      return item.title.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
    });
    setFilteredData(filterPostList);
  };

  // --------fetch data------------
  const fetchData = async (
    postListURL = "https://fs-blog-backend.herokuapp.com/api/post-list/"
  ) => {
    try {
      const result = await axios.get(postListURL);
      const data = result?.data;
      setPostDisplayList(data);
    } catch ({ response }) {
      if (response) {
        console.log("No data");
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  const filteredDataFunc = () => {
    if (searchKeyword !== "") {
      filterPosts(searchKeyword, postDisplayList);
    } else {
      setFilteredData(postDisplayList);
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 6);
  };

  function paginationFunc() {
    const slice = filteredData.slice(offset, offset + perPage);
    setPageCount(Math.ceil(filteredData.length / perPage));
    setFilteredDataWithPagination(slice);
  }
  // ----------useEffects--------
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filteredDataFunc();
  }, [searchKeyword, postDisplayList]);

  useEffect(() => {
    paginationFunc();
  }, [filteredData, offset, postDisplayList]);

  // -----------------RETURN------------------
  return !postDisplayList?.length ? (
    <div>
      <Navbar setKeyword={setSearchKeyword} />
      <div style={searchContainerStyle}>
        <SearchBox />
      </div>
      <LoopCircleLoading />
    </div>
  ) : (
    <div
      style={{
        backgroundColor: "#f6f5f5",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar setKeyword={setSearchKeyword} />
      <div style={searchContainerStyle}>
        <SearchBox setKeyword={setSearchKeyword} />
      </div>
      <div style={searchContainerStyle}>
        <CategoryDropDown />
      </div>
      <Grid container className={classes.root} spacing={5} justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={5}>
            {filteredData.length ? (
              filteredDataWithPagination.map((item, id) => {
                return <PostCard item={item} id={id} />;
              })
            ) : (
              <div>
                <p>"{searchKeyword}" is not available in bloglist titles.</p>
                <Box p={9}>
                  <button
                    type=""
                    onClick={() => setSearchKeyword("")}
                    style={buttonStyle}
                  >
                    Back to HomePage
                  </button>
                </Box>
              </div>
            )}
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
    </div>
  );
}

export default Home;
