// models/Event.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  clubId: { type: Schema.Types.ObjectId, ref: 'Club' },
  eventName: String,
  description: String,
  date: Date,
  participants: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, default: "pending" }
    }
  ],
  notifications: [
    {
      message: String,
      dateSent: Date
    }
  ]
});

module.exports = mongoose.model('Event', eventSchema);
