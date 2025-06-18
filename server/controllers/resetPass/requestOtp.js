import { sendVerificationCode } from "../../middleware/email.js";
import { User } from "../../models/userModel.js";

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  
      user.verificationCode = resetCode;
      user.otpExpiresAt = otpExpiresAt;
      await user.save();
  
      await sendVerificationCode(email, resetCode);
  
      res.json({ success: true, message: "OTP sent for password reset" });
    } catch (err) {
      console.error("Reset request error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  