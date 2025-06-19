import { Club } from "../../models/clubModel.js"

export const ClubData = async(req, res) =>{
    try {
        const {clubId} = req.params;
        
        const club = await Club.findById(clubId).populate({path:"members.user",
            select:"name"});
    
        res.status(200).json({
            success:true ,
            name: club.name,
            members:club.members,
            description:club.description
        })
    } catch (error) {
        console.error("Error in fetching club details", error)
        res.status(500).json("Internal server error")
    }
   

}