import { Club } from "../../models/clubModel.js";

export const requestToJoinClub = async(req,res)=>{
    try {
        const {userId , clubName} = req.body ;

        const club = await Club.findById(clubName);
        
        // Check if the user already requested to join
    const existingRequest = club.members.find(m => m.user === userId && m.status === "pending");
    if (existingRequest) return res.status(400).json({ success: false, message: "Request already sent" });

    // Add request to the club's members array
    club.members.push({ user: userId, status: "pending" });
    await club.save();

    res.json({ success: true, message: "Join request sent" });
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}