import { Club } from "../../models/clubModel.js";

 export const leaveClub = async (req, res) => {
    const { clubId } = req.params;
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }
  
    try {
      // Find the club
      const club = await Club.findById(clubId);
      if (!club) {
        return res.status(404).json({ message: "Club not found" });
      }
  
      // Remove userId from members array
      club.members = club.members.filter(
        (member) => member.toString() !== userId.toString()
      );
  
      await club.save();
  
      res.status(200).json({ message: "Left club successfully" });
    } catch (error) {
      console.error("Error leaving club:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  