const express = require('express');
const router = express.Router();
const Club = require('./club');  // Ensure lowercase match
const User = require('../models/User');

// Route to create a club with the first member as the admin
router.post('/create', async (req, res) => {
  const { name, description, adminId } = req.body;

  try {
    const user = await User.findById(adminId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newClub = new Club({
      name,
      description,
      adminId,
      members: [{ userId: adminId, role: "admin" }]
    });

    await newClub.save();

    // Add club to the user's createdClubs and clubs arrays
    user.createdClubs.push(newClub._id);
    user.clubs.push(newClub._id);
    await user.save();

    res.status(201).json({ message: "Club created successfully", club: newClub });
  } catch (error) {
    res.status(500).json({ message: "Error creating club", error });
  }
});

module.exports = router;
