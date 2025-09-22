import express from 'express';
import { getChatHistory } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected: fetch chat history for an event
router.get('/history/:eventId', protect, getChatHistory);

export default router;
