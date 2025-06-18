import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem("pendingResetEmail");

  const [form, setForm] = useState({
    code: "",
    newPassword: "",
  });
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/user/reset-password", {
        email,
        ...form,
      });
      setMsg(res.data.message);
      localStorage.removeItem("pendingResetEmail");
      navigate("/LoginUser");
    } catch (err) {
      setMsg(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="OTP"
          className="w-full border p-2 mb-2"
          value={form.otp}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 mb-4"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Reset Password
        </button>
      </form>
      {msg && <p className="mt-4 text-sm text-green-700">{msg}</p>}
    </div>
  );
};

export default ResetPassword;
