import express from "express";
import { getAdminClubs } from "../controllers/clubController/getAdminClubs.js";
import { approveMember } from "../controllers/clubController/approveRequest.js";

const router = express.Router();

router.get("/admin-clubs/:id", getAdminClubs);
router.post("/approve-request", approveMember);

export default router;