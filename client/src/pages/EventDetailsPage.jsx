import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer2 from '../components/Footer2';
import eventService from '../services/eventService';
import { AuthContext } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';

import { 
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon, 
    UserGroupIcon, 
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    PlusCircleIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
);


const EventDetailsPage = () => {
  // --- ALL YOUR EXISTING LOGIC IS UNTOUCHED ---
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);

  const load = async () => { try { const res = await eventService.getEventById(id); setEvent(res); } catch (err) { console.error(err); alert('Failed to load event'); } };
  useEffect(() => { load(); }, [id]);

  const handleJoin = async () => { try { await eventService.joinEvent(id); load(); } catch (err) { alert('Could not join'); } };
  const handleUnjoin = async () => { try { await eventService.unjoinEvent(id); load(); } catch (err) { alert('Could not unjoin'); } };
  // --- END OF YOUR EXISTING LOGIC ---

  if (!event) return <LoadingSpinner />;

  const joined = event.attendees.some(a => a._id === user?._id);
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- Tile 1: Main Header & CTA (Clean White) --- */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border-2 border-slate-100">
                        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-3">
                            {event.category}
                        </p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-dark leading-tight mb-6">
                            {event.title}
                        </h1>
                        {!joined ? (
                            <button onClick={handleJoin} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                                <PlusCircleIcon className="h-6 w-6"/> Join Event
                            </button>
                        ) : (
                            <button onClick={handleUnjoin} className="inline-flex items-center gap-2 bg-slate-100 text-gray-700 font-bold py-3 px-6 rounded-lg border border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors">
                                <CheckCircleIcon className="h-6 w-6 text-green-500"/> You've Joined
                            </button>
                        )}
                    </div>

                    {/* --- Tile 2: Key Details (Soft Purple Background) --- */}
                    <div className="bg-violet-50 rounded-xl p-6 border-2 border-violet-100">
                        <h3 className="font-bold text-xl text-dark mb-4">Event Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CalendarDaysIcon className="h-6 w-6 text-primary flex-shrink-0"/>
                                <div>
                                    <h4 className="font-semibold text-dark">Date</h4>
                                    <p className="text-gray-600">{formattedDate}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <ClockIcon className="h-6 w-6 text-primary flex-shrink-0"/>
                                <div>
                                    <h4 className="font-semibold text-dark">Time</h4>
                                    <p className="text-gray-600">{event.time}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0"/>
                                <div>
                                    <h4 className="font-semibold text-dark">Location</h4>
                                    <p className="text-gray-600">{event.city}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Tile 3: Description (Soft Blue Background) --- */}
                    <div className="lg:col-span-2 bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                         <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                            <InformationCircleIcon className="h-7 w-7 text-secondary"/> About this Event
                        </h2>
                        <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>

                    {/* --- Tile 4: Attendees (Soft Blue Background) --- */}
                    <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                        <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                            <UserGroupIcon className="h-7 w-7 text-secondary"/> Attendees ({event.attendees.length})
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {event.attendees.slice(0, 10).map(attendee => (
                                <img 
                                    key={attendee._id}
                                    src={`https://ui-avatars.com/api/?name=${attendee.name.split(' ').join('+')}&background=random&size=128`} 
                                    alt={attendee.name}
                                    title={attendee.name}
                                    className="h-12 w-12 rounded-full border-2 border-white shadow"
                                />
                            ))}
                            {event.attendees.length > 10 && (
                                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 border-2 border-white shadow">
                                    + {event.attendees.length - 10}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Tile 5: Chat (Clean White) --- */}
                    <div className="lg:col-span-3 bg-white rounded-xl p-6 border-2 border-slate-100">
                         <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-3">
                            <ChatBubbleLeftRightIcon className="h-8 w-8 text-secondary" />
                            Live Event Chat
                        </h2>
                        <ChatBox eventId={id} />
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer2 />
    </div>
  );
};

export default EventDetailsPage;