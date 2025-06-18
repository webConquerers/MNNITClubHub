// utils/jwt.js
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config(); 
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
