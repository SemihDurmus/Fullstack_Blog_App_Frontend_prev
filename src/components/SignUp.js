// import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postData } from "../utils/Utils";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  //let history = useHistory();
  const fetchData = (values) => {
    postData("user/register/", values)
      .then((data, err) => {
        toast("Successfully registered");
        alert("Successfully registered, You can Log In now");
      })
      .catch((err) => {
        toast(err?.message || "An error occured");
      });
  };

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
        .required("No password provided.")
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

  return (
    <div>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">User name</label>
        <input
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <label htmlFor="password2">Confirm Password</label>
        <input
          name="password2"
          type="password"
          placeholder="Password Confirm"
          value={formik.values.password2}
          onChange={formik.handleChange}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <div>{formik.errors.password2}</div>
        ) : null}

        <button type="submit">Submit</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
