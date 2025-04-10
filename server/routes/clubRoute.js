import express from "express";
import { createClub } from "../controllers/clubController/createClub.js";
import { getAllClubs } from "../controllers/clubController/getAllClubs.js";
import { ClubData } from "../controllers/clubOverViewController.js/getClubData.js";

const router = express.Router();

// Add debug middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


router.post("/createClub", createClub);
router.get("/clubs/:userId", getAllClubs);
router.get('/clubs/:clubId/data',ClubData);

export default router;