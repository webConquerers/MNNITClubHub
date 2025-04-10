import express from "express";
import { createAnnouncement, deleteAnnouncement, getAnnouncements, getClubAnnouncements } from "../controllers/clubController/announcementControllers.js";
const router = express.Router();

router.post('/:clubId/create', createAnnouncement);
router.delete('/delete', deleteAnnouncement)
router.get('/', getAnnouncements);
router.get('/:clubId/clubAnnouncements' , getClubAnnouncements)

export default router;