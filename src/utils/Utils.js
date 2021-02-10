import axios from "axios";

export const postData = async (path, data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `http://fs-blog-app-backend-django.herokuapp.com/${path}`,
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
