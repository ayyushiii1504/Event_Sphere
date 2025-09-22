import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // event-scoped chat
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // optional
    senderName: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
