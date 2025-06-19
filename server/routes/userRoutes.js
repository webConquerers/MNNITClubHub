import express from "express"
import { signup } from "../controllers/userController/signupControl.js";
import { login } from "../controllers/userController/loginControl.js";
import {  getUserClubRequests} from "../controllers/dashBoardController/getUserClubs.js";
import { verifyEmailForSignup } from "../controllers/userController/verifyEmail.js";
import { resendOTP } from "../controllers/userController/resendOtp.js";
import {requestPasswordReset} from "../controllers/resetPass/requestOtp.js";
import {resetPassword} from "../controllers/resetPass/resetPassword.js"
import { verifyOtpForResetPassword } from "../controllers/userController/verifyOtpForResetPassword.js";

const router = express.Router();

router.route("/RegUser").post(signup);
router.post("/verifyemail/signup", verifyEmailForSignup);
router.post("/verifyemail/reset", verifyOtpForResetPassword);

router.route("/LoginUser").post(login);
router.route("/club-requests/:userId").get(getUserClubRequests);
//router.route("/resendotp").post(verifyEmail);
router.route("/resendotp").post(resendOTP);
router.route("/request-reset").post(requestPasswordReset);
router.route("/reset-password").post(resetPassword);

export default router