import bcrypt from 'bcryptjs';
import { User } from "../../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email }); //finding if user already exists?

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassWord = await bcrypt.hash(password, 10);
    
    user = await User.create({
        name,
        email,
        password:hashPassWord
    })
    return res.status(200).json({
        success:true,
        message:"user created successfully"
    })
  } catch (error) {
    console.error("Error creating user:", error);
        if (!res.headersSent) { 
          res.status(500).json({ success: false, message: "Failed to create user", error: error.message });
        }
    }
};

