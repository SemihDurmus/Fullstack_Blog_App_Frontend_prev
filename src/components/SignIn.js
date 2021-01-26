import { useFormik } from "formik";

const fetchData = (props) => {
  const loginURL =
    "http://fs-blog-app-backend-django.herokuapp.com/auth/login/";

  fetch(loginURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: props.username,
      password: props.password,
    }),
  }).then((results) => console.log(results.json()));
};

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
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
