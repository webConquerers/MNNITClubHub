import express from "express";
import { createClub } from "../controllers/clubController/createClub.js";
import { getAllClubs } from "../controllers/clubController/getAllClubs.js";
import { ClubData } from "../controllers/clubOverViewController.js/getClubData.js";
import { getClubChats, postClubChat } from "../controllers/clubController/makeChats.js";
import { leaveClub } from "../controllers/clubController/leaveClub.js";

const router = express.Router();

// Add debug middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


router.post("/createClub", createClub);
router.get("/clubs/:userId", getAllClubs);
router.get('/clubs/:clubId/data',ClubData);
router.post('/clubs/:clubId/postChats', postClubChat);
router.get('/clubs/:clubId/getChats', getClubChats);
router.post("/clubs/:clubId/leave",leaveClub)
export default router;