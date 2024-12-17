const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
   recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile', // Reference to the User model
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile', // Reference to the User model
      required: true,
    },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
