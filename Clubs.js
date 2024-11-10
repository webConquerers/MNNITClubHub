// models/Club.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const clubSchema = new Schema({
  name: String,
  description: String,
  adminId: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, default: "member" }
    }
  ],
  events: [
    {
      eventId: Schema.Types.ObjectId,
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
    }
  ]
});

module.exports = mongoose.model('Club', clubSchema);
