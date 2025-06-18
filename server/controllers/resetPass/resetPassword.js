import bcrypt from 'bcryptjs';
import { User } from '../../models/userModel.js';

export const resetPassword = async (req, res) => {
  const { email,  newPassword } = req.body;

  if (!email ||  !newPassword) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // OTP checks
   

    // Ensure newPassword is not empty or invalid
    if (typeof newPassword !== "string" || newPassword.trim().length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    console.log(newPassword);
    user.password = await bcrypt.hash(newPassword, 10);
    user.verificationCode = null;
    user.otpExpiresAt = null;

    await user.save(); // This is where the error comes if password is invalid

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
