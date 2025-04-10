import express from "express"
import { signup } from "../controllers/userController/signupControl.js";
import { login } from "../controllers/userController/loginControl.js";
import { getUserClubs } from "../controllers/dashBoardController/getUserClubs.js";
const router = express.Router();

router.route("/RegUser").post(signup);
router.route("/LoginUser").post(login);
router.route("/profile/:userId").get(getUserClubs);

export default router