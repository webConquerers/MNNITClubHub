import { Club } from "../../models/clubModel.js";
import { User } from "../../models/userModel.js";

export const createClub = async (req, res) => {
  try {
   
    
    const { name, description, adminId } = req.body;
    
    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required"
      });
    }

    // Check for existing club
    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res.status(400).json({
        success: false,
        message: "Club name already exists"
      });
    }

    // Create new club
    const newClub = new Club({
      name,
      description,
      admin: adminId,
      members: [{ user: adminId, role: "admin", status: "approved" }]
    });

    await newClub.save();

    // Update user's clubs
    await User.findByIdAndUpdate(
      adminId,
      { $addToSet: { clubs: newClub._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Club created successfully",
      club: newClub
    });

  } catch (error) {
    console.error("Error in createClub:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};