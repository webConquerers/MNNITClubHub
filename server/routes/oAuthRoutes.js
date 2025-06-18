import express from "express";
import passport from "passport";
import { googleCallback } from "../controllers/userController/googleOAuth.js";
const router = express.Router();

// Step 1: Redirect user to Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google redirects back here
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

export default router;
