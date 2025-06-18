import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/user/request-reset", { email });
      setMsg(res.data.message);
      localStorage.setItem("pendingResetEmail", email); // Save email for verification
      navigate("/verifyEmail", { state: { email, context: "reset" } }); // context tells what this OTP is for
    } catch (err) {
      setMsg(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleRequest}>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send OTP
        </button>
      </form>
      {msg && <p className="mt-4 text-sm text-green-700">{msg}</p>}
    </div>
  );
};

export default ForgotPassword;
