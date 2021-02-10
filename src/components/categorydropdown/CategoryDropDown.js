import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import Select from "react-select";

import axios from "axios";

export const CategoryDropDown = ({ setSelectedOption }) => {
  const [categories, setCategories] = useState([]);

  const { categoryDisplay, setCategoryDisplay, reset } = useContext(Context);

  // --------fetch category list------------
  const fetchData = async (
    postListURL = "https://fs-blog-backend.herokuapp.com/api/category-list/"
  ) => {
    try {
      const result = await axios.get(postListURL);
      const data = result?.data;
      setCategories(data);
    } catch ({ response }) {
      if (response) {
        console.log("No data");
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  function selectedFunc(e) {
    return setSelectedOption(e.map((x) => x.value));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCategoryDisplay(
      categories.map((item) => {
        return {
          value: item.name,
          label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        };
      })
    );
  }, [categories]);

  return (
    <div style={{ minWidth: "250px" }}>
      <Select
        isMulti
        name="categories"
        options={categoryDisplay}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(e) => {
          selectedFunc(e);
        }}
      />
    </div>
  );
};
