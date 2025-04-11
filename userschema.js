// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  name: String,
  role: { type: String, default: "student" },
  clubs: [{ type: Schema.Types.ObjectId, ref: 'Club' }],
  createdClubs: [{ type: Schema.Types.ObjectId, ref: 'Club' }]
});

module.exports = mongoose.model('User', userSchema);
