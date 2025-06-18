import { Club } from "../../models/clubModel.js";




// Get all clubs
export const getAllClubs= async(req,res)=>{
  try {
    
    const clubs = await Club.find()
      .populate("members.user", "name email") // Populate member details
      .exec();

    res.status(200).json({ success: true, clubs });
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch clubs" });
  }
};
 
