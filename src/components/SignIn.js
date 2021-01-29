import "./SignInUp.css";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";

import { Context } from "../context/Context";
import { postData } from "../utils/Utils";

// ------------MAIN FUNCTION------------------------
export default function SignIn() {
  const { token, setToken } = useContext(Context);
  const [signInError, setSignInError] = useState("");
  const history = useHistory();

  const fetchData = async (values) => {
    try {
      const result = await postData("auth/login/", values);
      setToken(result?.data?.key);
      localStorage.setItem("token", result?.data?.key);
      history.push("/home");
    } catch ({ response }) {
      if (response) {
        setSignInError(response.data.non_field_errors[0]);
      } else {
        alert("Something went wrong!");
      }
    }
  };
  const refresh = () => {
    window.location.reload(false);
  };

  // ------------FORMIK-------------
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      if (values.username === "") {
        setSignInError("Enter username");
      } else if (values.password === "") {
        setSignInError("Enter password");
      } else fetchData(values);
    },
  });

  // ------------RETURN-------------
  return (
    <div className="sign-in-up-form-box">
      <form onSubmit={formik.handleSubmit}>
        <div className="icon-container">
          <div className="icon">
            <PersonIcon fontSize="small" />
          </div>
          <input
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </div>

        <div className="icon-container">
          <div className="icon">
            <LockIcon fontSize="small" />
          </div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        {signInError ? (
          <div className="error-message">{signInError}</div>
        ) : null}

        <button className="btn" type="submit">
          Sign In
        </button>
        <button className="btn" onClick={refresh}>
          Cancel
        </button>
      </form>
    </div>
  );
}
