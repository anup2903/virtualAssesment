const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const router = express.Router();

// Create or Update Profile
router.post('/set', async (req, res) => {
  const { skills, bio, role , userId , userName } = req.body;
  // const userId = req.user.id;

  try {
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      existingProfile.skills = skills;
      // existingProfile.interests = interests;
      existingProfile.userName = userName;
      existingProfile.bio = bio;
      existingProfile.role = role;
      await existingProfile.save();
      
      return res.json(existingProfile);
    }

    const newProfile = new Profile({ user: userId, skills, bio, role ,userName });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get Profile by User ID
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

router.get('/filter/:role/:skills', async (req, res) => {
  const { role, skills } = req.params;

  try {
    const query = {};
    if (role) query.role = role; // Add role filter if provided
    if (skills) query.skills = { $in: skills.split(',') }; // Match all skills provided in the query
   

    const profiles = await Profile.find(query).populate('user');
    
    if (!profiles.length) {
      return res.status(404).json({ message: 'No profiles found matching the criteria' });
    }

    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: `Error fetching profiles: ${err.message}` });
  }
});


module.exports = router;
