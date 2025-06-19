import { Annoucement } from "../../models/announcements.js";
import { Club } from "../../models/clubModel.js";

export const createAnnouncement = async (req, res) => {
  try {
   
    const { clubId , title, content, userId, registerLink } = req.body;
    
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: "Club not found " });

    if (String(club.admin) !== userId) {
      return res
        .status(403)
        .json({ message: "Only admins can crete announcements" });
    }

    const newAnnouncement = new Annoucement({
      club: clubId,
      title,
      registerLink,
      content,
      createdBy: userId,
    });

    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { announcementId, userId } = req.body;

    const announcement = Annoucement.find(announcementId);
    if (!announcement)
      return res.status(404).json({ message: "Announcement not found" });
    const club = await Club.findById(announcement.club);
    if (String(club.admin) !== userId) {
      return res
        .staus(403)
        .json({ message: "Only admins can delete the announcement" });
    }

    await Annoucement.findByIdAndDelete(announcementId);
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcement = await Annoucement.find().populate("club", "name");
    res.status(200).json({ announcement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClubAnnouncements = async (req, res) => {
    try {
      const { clubId } = req.params;
      const announcements = await Annoucement.find({ club: clubId });
      res.status(200).json({ announcements });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
