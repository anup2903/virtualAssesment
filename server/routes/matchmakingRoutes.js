const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();

// Get mentor/mentee suggestions
router.get('/getMatches/:role/:skills/:id', async (req, res) => {
  const { role, skills , id } = req.query;

  try {
    const profiles = await Profile.find({ role: role , user:id });

    // const matches = profiles.filter(profile => {
    //   return skills.some(skill => profile.skills.includes(skill));
    // });

    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching matches' });
  }
});

module.exports = router;
