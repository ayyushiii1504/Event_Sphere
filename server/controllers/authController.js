import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// POST /api/auth/signup
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,city } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password,city });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      eventsCreated: user.eventsCreated,
      eventsJoined: user.eventsJoined,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// POST /api/auth/login
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      eventsCreated: user.eventsCreated,
      eventsJoined: user.eventsJoined,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// GET /api/auth/profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('eventsCreated').populate('eventsJoined');
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      eventsCreated: user.eventsCreated,
      eventsJoined: user.eventsJoined,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
