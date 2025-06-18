import { Chats } from "../../models/chats.js";
import { User } from "../../models/userModel.js";

// POST: Add a chat message to a club
// POST /api/clubs/:clubId/postChats
export const postClubChat = async (req, res) => {
    try {
      const { clubId } = req.params;
      const { content, userId } = req.body;
  
      if (!content || !userId) {
        return res.status(400).json({ message: 'Missing content or userId' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'Invalid userId' });
      }
  
      const chat = new Chats({
        content,
        club: clubId,
        postedBy: userId,
      });
  
      const savedChat = await chat.save();
      const populatedChat = await savedChat.populate('postedBy', 'name');
  
      res.status(201).json({
        message: 'Chat posted successfully',
        chat: populatedChat,
      });
    } catch (error) {
      console.error("Error posting chat:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
// GET: Fetch all chats for a club
export const getClubChats = async (req, res) => {
  try {
    const { clubId } = req.params;
    const chats = await Chats.find({ club: clubId })
      .populate('postedBy', 'name')
      .sort({ postedAt: -1 })
    res.status(200).json({ chats });
  } catch (error) {
    console.error('Error in getClubChats:', error);
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
};
