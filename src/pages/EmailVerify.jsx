import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function EmailVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const context = location.state?.context || "signup";
  const email =
    location.state?.email ||
    (context === "reset"
      ? localStorage.getItem("pendingResetEmail")
      : localStorage.getItem("pendingEmail"));

 

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      setMessage("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);
      
      const endpoint =
        context === "signup"
          ? "http://localhost:3001/api/user/verifyemail/signup"
          : "http://localhost:3001/api/user/verifyemail/reset";

      const response = await axios.post(endpoint, {
        code: fullOtp,
        email,
      });

      const result = response.data;
      setMessage(result.message);

      if (result.success) {
        toast.success("Email verified successfully!", { autoClose: 3000 });
        localStorage.removeItem("pendingEmail");

        if (context === "signup") {
          setTimeout(() => navigate("/LoginUser"), 1000);
        } else if (context === "reset") {
          setTimeout(
            () => navigate("/reset-password", { state: { email } }),
            1000
          );
        }
      } else {
        toast.error("Verification failed: " + result.message, {
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Email does not exist or server error.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center backdrop-blur-lg">
      <h2 className="text-xl font-semibold mb-4">Enter the 6-digit OTP</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center text-xl border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
          ))}
        </div>
        <div className="grid-cols-2 justify-evenly">
          <span
            className="text-xs hover:cursor-pointer hover:text-blue-800"
            onClick={async () => {
              try {
                const res = await axios.post(
                  "http://localhost:3001/api/user/resendotp",
                  { email }
                );
                alert("OTP resent successfully!");
              } catch (err) {
                console.error("Error resending OTP:", err);
                alert("Failed to resend OTP");
              }
            }}
          >
            Resend OTP
          </span>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
