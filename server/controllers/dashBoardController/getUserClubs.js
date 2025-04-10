import { Club } from "../../models/clubModel.js";
import { User } from "../../models/userModel.js";

export const getUserClubs = async (req, res) => {
  try {
    // 1. Find the user
    const user = await User.findById(req.params.id)
      .populate('clubs', 'name description');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2. Find all clubs where the user is the admin
    const adminClubs = await Club.find({ admin: user.id })
      .populate('members.user', 'name email');

    res.json({ success: true, user, adminClubs });
  } catch (error) {
    console.error("Error in fetching user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
