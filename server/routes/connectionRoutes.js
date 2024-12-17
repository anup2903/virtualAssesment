const express = require('express');
const Connection = require('../models/Connection');
const Profile = require('../models/Profile');
const router = express.Router()

router.get('/status/:userId/:status', async (req, res) => {
    const { userId , status } = req.params;
  
    try {
      // Find the Profile associated with the provided userId
      const userProfile = await Profile.findOne({ user: userId });
      
      if (!userProfile) {
        console.log("error here");
        
        return res.status(404).json({ message: 'Profile not found for this user' });
      }
      
      if(status=="accepted"){
  
      // Find all connections where either user1 or user2 is the profile ID and the status is 'accepted'
      const acceptedConnections = await Connection.find({
        $or: [
          { sender: userProfile._id, status: status },
          { reciever: userProfile._id, status: status },
        ],
      })
        .populate("sender") // Populate user1 details from the Profile model
        .populate("reciever"); // Populate user2 details from the Profile model
      
      
      // Return the accepted connections
      res.json(acceptedConnections);
    }
      else if(status=="pending"){
        const acceptedConnections = await Connection.find({
          // $or: [
          reciever: userProfile._id,
          status: status,
          // ]
        })
          .populate("sender") // Populate user1 details from the Profile model
          .populate("reciever"); // Populate user2 details from the Profile model
          
          
          // Return the accepted connections
          res.json(acceptedConnections);
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching accepted connections' });
    }
  });

  router.put('/request/:user1/:user2/:status', async (req, res) => {
    const { user1 , user2 , status } = req.params;
  
    try {
        const userProfile1 = await Profile.findOne({ user: user1 });
        const userProfile2 = await Profile.findOne({ user: user2 });

        
        
        
      // Find the connection by ID and update the status to 'rejected'
      if(status=="rejected"){
        console.log("check2");
        
        const deletedConnection = await Connection.findOneAndDelete({
          $or: [
            {
              sender: userProfile1._id,
              reciever: userProfile2._id,
            },
            {
              reciever: userProfile1._id,
              sender: userProfile2._id,
            },
          ],
        });
    
          if (!deletedConnection) {
            return res.status(404).json({ message: 'Connection not found to delete' });
          }
    
          return res
            .status(200)
            .json({
              message: "Connection rejected and deleted",
              deletedConnection,
            });
      }
      const updatedConnection = await Connection.findOneAndUpdate(
        {
          $or: [
            {
              sender: userProfile1._id,
              reciever: userProfile2._id,
            },
            {
              reciever: userProfile1._id,
              sender: userProfile2._id,
            },
          ],
        },
        { status: status },
        { new: true } // Return the updated document
      );
      
  
      if (!updatedConnection) {
        return res.status(404).json({ message: 'Connection not found' });
      }
  
      res.status(200).json({ message: 'Connection status updated to rejected', updatedConnection });
    } catch (error) {
      console.error('Error updating connection status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
  