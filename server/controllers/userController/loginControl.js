import bcrypt from "bcryptjs";
import { User } from "../../models/userModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Email or Password!",
      });
    }

    // 2. Compare passwords
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched || !user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Email or Password!",
      });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, // Payload
      process.env.JWT_SECRET, // Secret from .env
      { expiresIn: "1d" } // Optional: expires in 1 day
    );

    // 4. Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      username: user.name,
      userId: user._id,
      token, // send token to frontend
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
