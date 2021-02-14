import axios from "axios";

export const postData = async (path, data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `https://fs-blog-backend.herokuapp.com/${path}`,
    data,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : null,
      },
    }
  );
  return response;
};

export const putData = async (path, data) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `https://fs-blog-backend.herokuapp.com/${path}`,
    data,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : null,
      },
    }
  );
  return response;
};
