const express = require('express');
const Notification = require('../models/Notification');
const Connection = require('../models/Connection');
const Profile = require('../models/Profile');
const router = express.Router();

// Send notification and connection
router.post('/send-request', async (req, res) => {
  const { userId, targetUserId, message } = req.body;

  const senderProfile = await Profile.findOne({ user: userId });
  if (!senderProfile) {
    console.log("error here");
    
    return res.status(404).json({ message: 'Profile not found for this user' });
  }
  const recieverProfile = await Profile.findOne({ user: targetUserId });
  if (!recieverProfile) {
    console.log("error here");
    
    return res.status(404).json({ message: 'Profile not found for this user' });
  }
  console.log("check1");

  if(senderProfile._id===recieverProfile._id){
    return res.status(400).json({message:"can't send request to yourself"});
  }
  
  try {
    // Check if a connection already exists (pending or accepted)
    const existingConnection = await Connection.findOne({
      sender: senderProfile._id, reciever: recieverProfile._id 
    });
    console.log(existingConnection);
    if (existingConnection && existingConnection.status!="rejected") {
      return res.status(400).json({ message: 'Connection already exists or is pending' });
    }
    console.log("check2");
    // Create a new connection with pending status
    const connection = new Connection({
      sender: senderProfile._id,
      reciever: recieverProfile._id,
      status: 'pending',
    });

    await connection.save();

    // Send notification about the connection request
    const notification = new Notification({
      recipient: targetUserId,
      sender: userId,
      message: `You have a new connection request `,
    });

    await notification.save();

    return res.status(201).json({ connection, notification });
  } catch (err) {
    res.status(500).json({ message: 'Error sending connection request' });
  }
});


router.post('/respond-request', async (req, res) => {
  const { userId, targetUserId, response } = req.body;
  console.log(targetUserId);
  
  if (response !== 'accepted' && response !== 'rejected') {
    return res.status(400).json({ message: 'Invalid response. Must be "accepted" or "rejected".' });
  }

  try {
    // Find the pending connection request
    const connection = await Connection.findOne({
      $or: [
        { user1: userId, user2: targetUserId, status: 'pending' },
        { user1: targetUserId, user2: userId, status: 'pending' },
      ],
    });

    if (!connection) {
      return res.status(404).json({ message: 'Connection request not found' });
    }

    // Update status based on response
    connection.status = response;
    await connection.save();

    // Send notification about the connection response
    const notification = new Notification({
      recipient: targetUserId,
      sender: userId,
      message: response === 'accepted' ? `Your connection request was accepted by ${userId}` : `Your connection request was rejected by ${userId}`,
    });

    await notification.save();

    return res.status(200).json({ connection, notification });
  } catch (err) {
    res.status(500).json({ message: 'Error responding to connection request' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch notifications for the specific user
    const notifications = await Notification.find({ recipient: userId })
      .populate('sender', 'username email') // Populate the sender's details (e.g., username, email)
      .sort({ createdAt: -1 }); // Sort notifications by creation date, most recent first

    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    return res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});



module.exports = router;
