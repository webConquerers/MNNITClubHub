import express from "express"
import { signup } from "../controllers/userController/signupControl.js";
import { login } from "../controllers/userController/loginControl.js";
import {  getUserClubRequests} from "../controllers/dashBoardController/getUserClubs.js";
const router = express.Router();

router.route("/RegUser").post(signup);
router.route("/LoginUser").post(login);
router.route("/club-requests/:userId").get(getUserClubRequests);

export default router