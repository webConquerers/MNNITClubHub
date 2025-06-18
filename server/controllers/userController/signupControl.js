import bcrypt from 'bcryptjs';
import { User } from "../../models/userModel.js";
import { sendVerificationCode } from '../../middleware/email.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 minutes

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationCode: verificationCode,
      otpExpiresAt,
      isVerified: false
    });

    // Send verification code
    await sendVerificationCode(user.email, verificationCode);

    return res.status(200).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
    });

  } catch (error) {
    console.error("Error during signup:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Server error during signup",
        error: error.message,
      });
    }
  }
};
