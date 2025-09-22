import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer2 from '../components/Footer2';
import eventService from '../services/eventService';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard'; // Using your original EventCard
import { TrashIcon, TicketIcon } from '@heroicons/react/24/solid'; // Using the 'solid' icon for better visibility

const MyEventsPage = () => {
  // --- ALL YOUR EXISTING LOGIC IS UNTOUCHED ---
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
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await eventService.deleteEvent(id);
        setEvents(events.filter(ev => ev._id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete event");
      }
    }
  };
  // --- END OF YOUR EXISTING LOGIC ---

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-dark">My Created Events</h1>
          <Link to="/create-event" className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex-shrink-0">
            + Create New Event
          </Link>
        </div>
        
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(ev => (
              <div key={ev._id} className="relative group">
                {/* Your original EventCard is used here */}
                <EventCard event={ev} />

                {/* === This is the new, beautifully styled delete button === */}
                <button
                  onClick={() => handleDelete(ev._id)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-full border border-red-200 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label="Delete event"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
           <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 mt-12">
            <TicketIcon className="h-20 w-20 mx-auto text-gray-300" />
            <h3 className="mt-4 text-2xl font-semibold text-dark">You haven't created any events yet.</h3>
            <p className="mt-2 text-gray-500">Why not create your first one now?</p>
            <Link to="/create-event" className="inline-block mt-6 bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              Create an Event
            </Link>
          </div>
        )}
      </main>
      <Footer2 />
    </div>
  );
};

export default MyEventsPage;