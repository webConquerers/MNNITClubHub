import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/SignUp.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleDashboard = async (event) => {
    event.preventDefault();
    console.log("Logging in as User");

    try {
      const result = await axios.post(
        "http://localhost:3001/api/user/LoginUser",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Full response:", result);

      if (result.data.success) {
        toast.success("Login successful!", { autoClose: 3000 });

        localStorage.setItem("userName", result.data.username);
        localStorage.setItem("userId" , result.data.userId)

        setTimeout(() => {
          navigate("/UserPage" ); // Navigate after a short delay
        }, 500); // Ensures localStorage is updated before navigating
      } else {
        toast.error(result.data.message || "Login failed", { autoClose: 3000 });
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || "An error occurred during login",
        { autoClose: 3000 }
      );
    }
  };

  const handleRegistration = () => {
    navigate("/RegUser");
  };

  return (
    <div className="bg">
      <div className="wrapper">
        <form onSubmit={async (e) => await handleDashboard(e)}>
          <h1>Login</h1>

          <div className="input-box">
            <label htmlFor="email">Email-Id</label>
            <input
              className="px-5"
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              className="px-5"
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          <div className="text-sm px-3 flex">
            <p>Not Registered?</p>
            <button
              className="text-gray-300 px-0 hover:text-cyan-600 py-0"
              onClick={handleRegistration}
            >
              Click here
            </button>
          </div>

          <button id="oauth" className="p-2">
            <a href="/oauth">Login with Google</a>
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginPage;
