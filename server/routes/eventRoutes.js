import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  unjoinEvent
} from '../controllers/eventController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getEvents).post(protect, createEvent);
router.route('/:id').get(getEventById).put(protect, updateEvent).delete(protect, deleteEvent);
router.post('/:id/join', protect, joinEvent);
router.post('/:id/unjoin', protect, unjoinEvent);

export default router;
