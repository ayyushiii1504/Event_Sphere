import api from './api';

const getEvents = (params = {}) => api.get('/events', { params }).then(res => res.data);
const getEventById = (id) => api.get(`/events/${id}`).then(res => res.data);
const createEvent = (data) => api.post('/events', data).then(res => res.data);
const updateEvent = (id, data) => api.put(`/events/${id}`, data).then(res => res.data);
const deleteEvent = (id) => api.delete(`/events/${id}`).then(res => res.data);
const joinEvent = (id) => api.post(`/events/${id}/join`).then(res => res.data);
const unjoinEvent = (id) => api.post(`/events/${id}/unjoin`).then(res => res.data);

export default {
  getEvents, getEventById, createEvent, updateEvent, deleteEvent, joinEvent, unjoinEvent
};
