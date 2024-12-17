const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Register user
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
   
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, password:hashedPassword, email});
    await newUser.save();

    const userId = newUser._id;
    console.log(userId);
    
    
    const token = jwt.sign({ id: newUser._id },process.env.JWT_SECRET_KEY);
    

    res.status(201).json({ token , userId });
  } catch (err) {
    res.status(500).json({ message: `server error : ${err}` });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("check1");
  

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    console.log("check1",user);
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    console.log("check2",isMatch);
    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET_KEY);
    console.log("check3");
    const userId = user._id ;
    const name = user.username;
    res.json({ token ,userId,name});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout (clear JWT on client side)
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
