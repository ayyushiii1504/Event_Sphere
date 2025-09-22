import api from './api';

// fetch chat history for an event
export const getChatHistory = async (eventId) => {
  const res = await api.get(`/chat/history/${eventId}`);
  return res.data;
};
