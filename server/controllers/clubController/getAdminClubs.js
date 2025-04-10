import { Club } from "../../models/clubModel.js";

export const getAdminClubs = async (req, res) =>{
    try {
        const adminId = req.params.id ;
        console.log(adminId)
        const adminClubs = await Club.find({admin:adminId})
            .populate('members.user','name email')
            .select('name desciption members');

            res.status(200).json({success: true , adminClubs})
    } catch (error) {
        console.error("Error in fetchinf admin clubs:" ,error);
        res.status(500).json({success:false , message:"Server error"})
    }
}