import React from "react";
import "../style/SignUp.css";
import AdminDashboard from "../AdminDashboard";
import { useNavigate } from "react-router-dom";

function SingnUpPage() {
  const navigate = useNavigate();
  const handleDasboard = (event) => {
    event.preventDefault();
    console.log("Logging in as User");
    
  };
  const HandleSub=()=>{
    navigate('/LoginUser')
  }
  return (
    <div className="bg">
      <div className="wrapper">
        <form onSubmit={handleDasboard}>
          <h1>Register as User</h1>
          <div className="input-box">
            <label for="EmailId">Name</label>
            <input className="px-5" type="text" id="EmailId " placeholder=" Full Name " />
            <i className="bx bx-lock"></i>
          </div>
          <div className="input-box">
            <label for="EmailId">Email-Id</label>
            <input className="px-5" type="text" id="EmailId " placeholder="EmailId " />
            <i className="bx bx-lock"></i>
          </div>
          <div className="input-box">
            <label for="password">Password</label>
            <input className="px-5"type="password" placeholder="Password " id="password" />
          </div>
          <div className="input"></div>
          <button type="submit" className="btn" onSubmit={HandleSub} onClick={HandleSub}>
            Register
          </button>
          <button id="oauth">
            <a href="/oauth">Register using Google</a>
          </button>
        </form>
      </div>
    </div>
  );
}
export default SingnUpPage;
