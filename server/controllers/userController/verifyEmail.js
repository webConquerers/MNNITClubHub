import { User } from "../../models/userModel.js";

export const verifyEmailForSignup = async (req, res) => {
  const { code, email } = req.body;

  if (!email || !code) {
    return res.status(400).json({ success: false, message: "Missing email or code" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (
      !user.verificationCode ||
      user.verificationCode !== code ||
      Date.now() > user.otpExpiresAt
    ) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Mark as verified
    user.verificationCode = null;
    user.otpExpiresAt = null;
    user.isVerified = true;

    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });

  } catch (err) {
    console.error("Signup OTP verification error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
