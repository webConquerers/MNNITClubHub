// controllers/adminController/approveMember.js
import { Club } from "../../models/clubModel.js";

export const approveMember = async (req, res) => {
  try {
    const { clubId, userId } = req.body;

    const club = await Club.findById(clubId);

    const member = club.members.find(
      m => m.user.toString() === userId && m.status === 'pending'
    );

    if (!member) return res.status(404).json({ message: "Request not found" });

    member.status = 'approved';
    await club.save();

    res.json({ success: true, message: "Member approved" });
  } catch (error) {
    console.error("Error approving member:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
