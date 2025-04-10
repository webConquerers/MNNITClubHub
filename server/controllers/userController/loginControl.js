import bcrypt from "bcryptjs";
import { User } from "../../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email: ", email)
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
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Email or Password!",
      });
    }
    console.log(user.name)
    // 3. Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      username: user.name, // or whatever user data you want to retur
      userId: user._id
    });
    
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
