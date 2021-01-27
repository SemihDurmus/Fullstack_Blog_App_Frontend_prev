import { useContext } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import { Context } from "../context/Context";
import { postData } from "../utils/Utils";

// ------------MAIN FUNCTION------------------------
export default function SignIn() {
  const { token, setToken } = useContext(Context);
  const history = useHistory();

  const fetchData = async (values) => {
    try {
      const result = await postData("auth/login/", values);
      setToken(result?.data?.key);
      localStorage.setItem("token", result?.data?.key);
      history.push("/home");
    } catch ({ response }) {
      if (response) {
        console.log(response.data.non_field_errors[0]);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  // ------------FORMIK-------------
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      fetchData(values);
    },
  });

  // ------------RETURN-------------
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">User name</label>
        <input
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="submit">Sign In</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
