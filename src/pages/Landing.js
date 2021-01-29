import { useState } from "react";
import "./Landing.css";

import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

function Landing() {
  const [showSI, setShowSI] = useState(true);

  const toggleView = () => {
    setShowSI(!showSI);
  };

  return (
    <div className="hero">
      <div className="title-container">
        <h1 className="title">The Blog</h1>
      </div>
      <div className="form-box">
        <div className="button-box">
          <div
            className="float-btn"
            style={showSI ? { left: 0 } : { left: "110px" }}
          ></div>
          <button className="toggle-btn" onClick={toggleView}>
            Sign In
          </button>
          <button className="toggle-btn" onClick={toggleView}>
            Sign Up
          </button>
        </div>
        {showSI ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}

export default Landing;
