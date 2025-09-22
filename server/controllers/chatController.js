import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';

// GET /api/chat/history/:eventId
// returns array of messages for that event (sorted by timestamp ascending)
const getChatHistory = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  if (!eventId) {
    res.status(400);
    throw new Error('Event ID required');
  }

  const messages = await Message.find({ eventId }).sort({ timestamp: 1 }).lean();
  res.json(messages);
});

export { getChatHistory };
