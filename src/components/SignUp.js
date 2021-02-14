import "./SignInUp.css";

import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";

import { useFormik } from "formik";
import * as Yup from "yup";
import { postData } from "../utils/Utils";
// import { toast, ToastContainer } from "react-toastify";

// ------------MAIN FUNCTION------------------------
export default function SignUp() {
  const fetchData = (values) => {
    postData("user/register/", values)
      .then((data, err) => {
        // toast("Successfully registered");
        alert("Successfully registered, You can Log In now");
        // refresh();
      })
      .catch((err) => {
        alert(err?.message || "An error occured");
      });
  };
  const refresh = () => {
    window.location.reload(false);
  };
  // ------------INLINE STYLES--------
  const iconContainerStyle = {
    width: "300px",
    height: "40px",
    position: "relative",
    margin: "30px auto",
  };
  const iconStyle = {
    position: "absolute",
    top: "10px",
    left: "15px",
  };

  // ------------FORMIK-------------
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided")
        .min(6, "Should be min 6 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
          "Must contain min one uppercase, one lowercase and one number"
        ),
      password2: Yup.string()
        .required("You should confirm the password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      fetchData(values);
    },
  });

  // ------------RETURN-------------
  return (
    <div className="sign-in-up-form-box">
      {/* <ToastContainer /> */}
      <form onSubmit={formik.handleSubmit}>
        <div style={iconContainerStyle}>
          <div style={iconStyle}>
            <PersonIcon fontSize="small" />
          </div>
          <input
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error-message">{formik.errors.username}</div>
          ) : null}
        </div>
        <div style={iconContainerStyle}>
          <div style={iconStyle}>
            <EmailIcon fontSize="small" />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>
        <div style={iconContainerStyle}>
          <div style={iconStyle}>
            <LockIcon fontSize="small" />
          </div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>
        <div style={iconContainerStyle}>
          <div style={iconStyle}>
            <LockIcon fontSize="small" />
          </div>
          <input
            name="password2"
            type="password"
            placeholder="Confirm Password"
            value={formik.values.password2}
            onChange={formik.handleChange}
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div className="error-message">{formik.errors.password2}</div>
          ) : null}
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
        <button className="btn" onClick={refresh}>
          Cancel
        </button>
      </form>
    </div>
  );
}
