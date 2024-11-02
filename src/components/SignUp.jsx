import React from "react";
import "../style/SignUp.css";
import AdminDashboard from "../AdminDashboard";
import { useNavigate } from "react-router-dom";

function SingnUpPage() {
  const navigate = useNavigate();
  const handleDasboard = (event) => {
    event.preventDefault();
    console.log("Logging in as User");
    // Perform user login logic here
    navigate("/admin-dashboard"); // Redirect to user dashboard
  };
  return (
    <div className="bg">
      <div className="wrapper">
        <form onSubmit={handleDasboard}>
          <h1>Sign Up</h1>

          <div className="input-box">
            <label for="EmailId">Email-Id</label>
            <input type="text" id="EmailId " placeholder="EmailId " />
            <i className="bx bx-lock"></i>
          </div>
          <div className="input-box">
            <label for="password">Password</label>
            <input type="password" placeholder="Password " id="password" />
          </div>
          <div className="input"></div>
          <button type="submit" className="btn">
            Register
          </button>

          <a href="/signIn" className="anchor">
            Sign In
          </a>
          <button id="oauth">
            <a href="/oauth">Register Using Google</a>
          </button>
        </form>
      </div>
    </div>
  );
}
export default SingnUpPage;
