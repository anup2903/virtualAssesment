const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['mentor', 'mentee'], required: true },
  userName:String,
  skills: [String],
  bio: String,
});

module.exports = mongoose.model('Profile', profileSchema);
