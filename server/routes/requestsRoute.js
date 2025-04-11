import express from "express"
import { requestToJoinClub } from "../controllers/clubController/joinClubRequest.js";
const router = express.Router();

router.route("/join/:clubId").post(requestToJoinClub)

export default router 