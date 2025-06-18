// pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { saveAuthToken, storeUserSession } from "../../server/utils/authUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/SignUp.css";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPass = () => {
  
    navigate("/ForgotPassword")
  };
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/user/LoginUser",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Full response:", res);


      if (res.data.success) {
        toast.success("Login successful!", { autoClose: 2000 });
        saveAuthToken(res.data.token);
        storeUserSession(res.data.username, res.data.userId);

        setTimeout(() => navigate("/UserPage"), 500);
      } else if (res.data.verified === false) {
        toast.warn("Email not verified. Please verify your email.");
        localStorage.setItem("pendingEmail", email);
        navigate("/verifyEmail");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login error");
    }
  };

  const handleRegistration = () => {
    navigate("/RegUser");
  };

  return (
    <div className="bg">
      <div className="wrapper">
        <form onSubmit={handleEmailLogin}>
          <h1>Login</h1>

          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
         

          <button type="submit" className="btn">Login</button>

          <div className="flex-col justify-around">
            
            <div className="text-sm mt-2">
              <p>Not Registered? 
                <button onClick={handleRegistration} className="text-cyan-500 ml-2">
                  Sign Up
                </button>
              </p>
            </div>
            <span onClick={ handleResetPass}>forgot Password</span>
            </div>

          <hr className="my-4" />

          <div className="text-center">
            <p className="text-gray-400">Or</p>
            <a
              className="mt-2 block bg-red-600 text-white rounded py-2 hover:bg-red-700"
              href="http://localhost:3001/api/auth/google"
            >
              Continue with Google
            </a>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginPage;
