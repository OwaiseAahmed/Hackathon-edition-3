const express = require('express');
const userRoutes = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

userRoutes.get('/profile', protect, getProfile);
userRoutes.put('/profile', protect, updateProfile);

module.exports = userRoutes;
