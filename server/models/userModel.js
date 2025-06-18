import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // typo fixed
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: function () {
        return this.loginMethod !== "google";
      },
    },
    
    googleId: { 
      type: String ,
      unique: true,
      sparse: true, 
    },
    clubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs",
      },
    ],
    verificationCode: { type: String }, // ✅ renamed
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);


export const User = mongoose.model("User", userSchema);
