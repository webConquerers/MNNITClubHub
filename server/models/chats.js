import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubs',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
});

export const Chats = mongoose.model('Chats', chatSchema);
