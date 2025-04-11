// controllers/userController.js
import { Club } from "../../models/clubModel.js";

export const getUserClubRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const clubs = await Club.find({
      members: {
        $elemMatch: { user: userId }
      }
    }).select("name description members");

    const result = clubs.map((club) => {
      const member = club.members.find(
        (m) => m.user.toString() === userId
      );

      return {
        name: club.name,
        description: club.description,
        status: member?.status || "unknown"
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user club requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};
