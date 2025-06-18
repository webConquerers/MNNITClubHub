import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const VerifyResetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!otp || !email) {
      setMsg("Missing email or OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3001/api/user/verify-reset-otp", {
        email,
        otp,
      });
      setMsg(res.data.message);

      // Navigate to reset password with email and otp
      navigate("/reset-password", { state: { email, otp } });
    } catch (err) {
      setMsg(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-2 mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {msg && <p className="mt-4 text-sm text-red-600">{msg}</p>}
    </div>
  );
};

export default VerifyResetOtp;
