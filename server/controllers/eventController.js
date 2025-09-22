import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import User from '../models/User.js';

// GET /api/events?search=&city=&category=
export const getEvents = asyncHandler(async (req, res) => {
  const { search, city, category } = req.query;
  const filter = {};
  if (search) filter.title = { $regex: search, $options: 'i' };
  if (city) filter.city = city;
  if (category) filter.category = category;
  const events = await Event.find(filter).populate('creator', 'name email').sort({ date: 1 });
  res.json(events);
});

// GET /api/events/:id
export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate('creator', 'name email')
    .populate('attendees', 'name email');
  if (event) res.json(event);
  else { res.status(404); throw new Error('Event not found'); }
});

// POST /api/events
export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, category, city, date, time } = req.body;
  const event = new Event({ title, description, category, city, date, time, creator: req.user._id });
  const created = await event.save();
  await User.findByIdAndUpdate(req.user._id, { $push: { eventsCreated: created._id } });
  res.status(201).json(created);
});

// PUT /api/events/:id
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) { res.status(404); throw new Error('Event not found'); }
  if (event.creator.toString() !== req.user._id.toString()) {
    res.status(403); throw new Error('Not authorized');
  }
  const { title, description, category, city, date, time } = req.body;
  Object.assign(event, { title, description, category, city, date, time });
  const updated = await event.save();
  res.json(updated);
});

// DELETE /api/events/:id
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) { res.status(404); throw new Error('Event not found'); }
  if (event.creator.toString() !== req.user._id.toString()) {
    res.status(403); throw new Error('Not authorized');
  }

  await event.deleteOne();

  // Remove from creator’s list
  await User.findByIdAndUpdate(req.user._id, { $pull: { eventsCreated: event._id } });

  // Remove from all joined lists
  await User.updateMany(
    { eventsJoined: event._id },
    { $pull: { eventsJoined: event._id } }
  );

  res.json({ message: 'Event removed everywhere' });
});

// POST /api/events/:id/join
export const joinEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) { res.status(404); throw new Error('Event not found'); }
  if (!event.attendees.includes(req.user._id)) {
    event.attendees.push(req.user._id);
    await event.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { eventsJoined: event._id } });
  }
  res.json({ message: 'Joined' });
});

// POST /api/events/:id/unjoin
export const unjoinEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) { res.status(404); throw new Error('Event not found'); }
  event.attendees = event.attendees.filter(a => a.toString() !== req.user._id.toString());
  await event.save();
  await User.findByIdAndUpdate(req.user._id, { $pull: { eventsJoined: event._id } });
  res.json({ message: 'Unjoined' });
});
