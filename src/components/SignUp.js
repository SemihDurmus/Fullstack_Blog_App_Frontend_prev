import { useFormik } from "formik";
import * as Yup from "yup";

const fetchData = (props) => {
  const registerURL =
    "http://fs-blog-app-backend-django.herokuapp.com/user/register/";

  fetch(registerURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: props.username,
      email: props.email,
      password: props.password,
      password2: props.password2,
    }),
  }).then((results) => console.log(results.json()));
};

export default function SignUp() {
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
  console.log(formik);
  return (
    <div>
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
