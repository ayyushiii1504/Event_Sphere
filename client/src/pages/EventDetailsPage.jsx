import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer2 from '../components/Footer2';
import eventService from '../services/eventService';
import { AuthContext } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-light">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-2 border-stone" />
      <div className="absolute inset-0 border-t-2 border-primary animate-spin" />
    </div>
  </div>
);

const EventDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);

  const load = async () => {
    try { const res = await eventService.getEventById(id); setEvent(res); }
    catch (err) { console.error(err); alert('Failed to load event'); }
  };
  useEffect(() => { load(); }, [id]);

  const handleJoin = async () => { try { await eventService.joinEvent(id); load(); } catch (err) { alert('Could not join'); } };
  const handleUnjoin = async () => { try { await eventService.unjoinEvent(id); load(); } catch (err) { alert('Could not unjoin'); } };

  if (!event) return <LoadingSpinner />;

  const joined = event.attendees.some(a => a._id === user?._id);
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* ── Event Header ── */}
        <section className="bg-dark relative overflow-hidden pt-16 pb-20 px-6">
          <div className="absolute inset-8 border border-white/5 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <span className="inline-block text-xs font-sans font-medium tracking-widest uppercase text-accent border border-accent/40 px-3 py-1 mb-6">
              {event.category}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight max-w-4xl">
              {event.title}
            </h1>

            {/* Join CTA */}
            <div className="mt-10">
              {!joined ? (
                <button
                  onClick={handleJoin}
                  className="btn-gold text-sm tracking-widest uppercase px-10 py-4"
                >
                  ✦ &nbsp; Join This Event
                </button>
              ) : (
                <button
                  onClick={handleUnjoin}
                  className="inline-flex items-center gap-3 border border-stone text-stone hover:border-red-400 hover:text-red-400 transition-colors font-sans text-sm tracking-widest uppercase px-10 py-4"
                >
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  You've Joined
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Content Grid ── */}
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Details Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-cream border border-stone p-8">
              <p className="text-xs font-sans tracking-widest uppercase text-primary mb-6">Event Details</p>
              <div className="space-y-5">
                {[
                  { label: 'Date', value: formattedDate },
                  { label: 'Time', value: event.time },
                  { label: 'Location', value: event.city },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-stone pb-5 last:border-0 last:pb-0">
                    <p className="text-xs font-sans tracking-widest uppercase text-muted mb-1">{label}</p>
                    <p className="font-display text-xl font-semibold text-dark">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendees */}
            <div className="bg-white border border-stone p-8">
              <p className="text-xs font-sans tracking-widest uppercase text-primary mb-5">
                Attendees &nbsp;
                <span className="font-sans font-semibold text-dark normal-case tracking-normal text-sm">
                  ({event.attendees.length})
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {event.attendees.slice(0, 12).map(attendee => (
                  <img
                    key={attendee._id}
                    src={`https://ui-avatars.com/api/?name=${attendee.name.split(' ').join('+')}&background=1C1C2E&color=D4AF37&size=80&bold=true`}
                    alt={attendee.name}
                    title={attendee.name}
                    className="w-10 h-10 border border-stone"
                  />
                ))}
                {event.attendees.length > 12 && (
                  <div className="w-10 h-10 bg-cream border border-stone flex items-center justify-center">
                    <span className="text-xs font-sans font-medium text-muted">+{event.attendees.length - 12}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white border border-stone p-10">
              <p className="text-xs font-sans tracking-widest uppercase text-primary mb-6">About This Event</p>
              <p className="font-sans text-charcoal leading-relaxed text-sm">{event.description}</p>
            </div>

            {/* Chat */}
            <div className="bg-white border border-stone p-8">
              <p className="text-xs font-sans tracking-widest uppercase text-primary mb-6">Live Chat</p>
              <ChatBox eventId={id} />
            </div>
          </div>
        </div>
      </main>
      <Footer2 />
    </div>
  );
};

export default EventDetailsPage;
