// controllers/clubController.js
import { Club } from "../../models/clubModel.js";

export const requestToJoinClub = async (req, res) => {
  const { clubId } = req.params;
  const { userId } = req.body;

  try {
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    // Check if user already in members list
    const alreadyRequested = club.members.find(
      (m) => m.user.toString() === userId
    );

    if (alreadyRequested) {
      return res.status(400).json({ message: "Already requested or a member" });
    }

    // Add new member with pending status
    club.members.push({
      user: userId,
      role: "member",
      status: "pending",
    });

    await club.save();

    res.status(200).json({ message: "Join request sent successfully" });
  } catch (error) {
    console.error("Error in join request:", error);
    res.status(500).json({ message: "Server error" });
  }
};
