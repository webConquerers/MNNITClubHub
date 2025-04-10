import mongoose from "mongoose";

const announcementSchema = {
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Clubs', required: true }, // Club ID
  title: { type: String, required: true },
  content: { type: String, required: true },
  registerLink :{type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin who created it
  createdAt: { type: Date, default: Date.now }
}
export const Annoucement = mongoose.model('Annoncement',announcementSchema)