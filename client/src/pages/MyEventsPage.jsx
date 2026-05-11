import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer2 from '../components/Footer2';
import eventService from '../services/eventService';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';

const MyEventsPage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await eventService.getEvents();
        const mine = all.filter(ev => ev.creator?._id === user?._id || ev.creator === user?._id);
        setEvents(mine);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) load();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        setEvents(events.filter(ev => ev._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete event');
      }
    }
  };

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div>
            <p className="text-xs font-sans tracking-widest uppercase text-primary mb-3">Dashboard</p>
            <h1 className="font-display text-5xl font-light text-dark">My Created Events</h1>
            <div className="w-12 h-px bg-primary mt-4" />
          </div>
          <Link
            to="/create-event"
            className="btn-gold text-sm tracking-widest uppercase px-8 py-3.5 flex-shrink-0"
          >
            + New Event
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(ev => (
              <div key={ev._id} className="relative group">
                <EventCard event={ev} />
                <button
                  onClick={() => handleDelete(ev._id)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white border border-stone text-muted opacity-0 group-hover:opacity-100 hover:border-red-400 hover:text-red-500 transition-all duration-200"
                  aria-label="Delete event"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center border border-dashed border-stone bg-cream py-20 px-8">
            <div className="w-16 h-px bg-stone mx-auto mb-8" />
            <p className="font-display text-3xl font-light text-muted mb-3">No events yet</p>
            <p className="text-sm font-sans text-muted mb-8">You haven't created any events. Why not start now?</p>
            <Link to="/create-event" className="btn-gold text-sm tracking-widest uppercase px-8 py-3.5">
              Create Your First Event
            </Link>
            <div className="w-16 h-px bg-stone mx-auto mt-8" />
          </div>
        )}
      </main>
      <Footer2 />
    </div>
  );
};

export default MyEventsPage;
