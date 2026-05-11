import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Footer2 from '../components/Footer2';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-light">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-2 border-stone" />
      <div className="absolute inset-0 border-t-2 border-primary animate-spin" />
    </div>
  </div>
);

const MiniEventCard = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <Link
      to={`/events/${event._id}`}
      className="group flex items-center gap-5 p-5 border border-stone bg-light hover:border-primary transition-all duration-200"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-dark flex items-center justify-center">
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-display text-lg font-semibold text-dark truncate group-hover:text-primary transition-colors">{event.title}</h4>
        <p className="text-xs font-sans text-muted mt-0.5">{formattedDate} &nbsp;·&nbsp; {event.city}</p>
      </div>
      <span className="text-muted group-hover:text-primary transition-colors transform group-hover:translate-x-1 duration-200 flex-shrink-0">→</span>
    </Link>
  );
};

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try { const res = await api.get('/auth/profile'); setProfile(res.data); }
      catch (err) { console.error(err); }
    };
    if (user) load();
  }, [user]);

  if (!profile) return <LoadingSpinner />;

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 w-full">

        {/* ── Profile Header ── */}
        <div className="bg-dark relative overflow-hidden p-10 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 border border-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <img
              src={`https://ui-avatars.com/api/?name=${profile.name.split(' ').join('+')}&background=B8860B&color=fff&size=128&bold=true`}
              alt={profile.name}
              className="w-20 h-20 border-2 border-accent/40 flex-shrink-0"
            />
            <div>
              <p className="text-xs font-sans tracking-widest uppercase text-accent mb-2">Member Profile</p>
              <h1 className="font-display text-4xl font-semibold text-white">{profile.name}</h1>
              <div className="flex flex-wrap gap-5 mt-3">
                <span className="text-sm font-sans text-stone/70">{profile.email}</span>
                <span className="text-stone/40">·</span>
                <span className="text-sm font-sans text-stone/70">{profile.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 bg-cream border border-stone mb-8 divide-x divide-stone">
          {[
            { label: 'Events Joined', value: profile.eventsJoined?.length || 0 },
            { label: 'City', value: profile.city },
            { label: 'Member Since', value: new Date().getFullYear() },
          ].map(({ label, value }) => (
            <div key={label} className="px-6 py-5 text-center">
              <p className="font-display text-2xl font-semibold text-dark">{value}</p>
              <p className="text-xs font-sans tracking-widest uppercase text-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Events Joined ── */}
        <div className="bg-white border border-stone p-8">
          <div className="flex items-end gap-4 mb-8">
            <div>
              <p className="text-xs font-sans tracking-widest uppercase text-primary mb-2">History</p>
              <h2 className="font-display text-3xl font-light text-dark">Events You Joined</h2>
            </div>
            <div className="flex-1 h-px bg-stone mb-1" />
          </div>

          {profile.eventsJoined?.length ? (
            <div className="space-y-3">
              {profile.eventsJoined.map(event => (
                <MiniEventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center border border-dashed border-stone bg-light py-14 px-8">
              <div className="w-10 h-px bg-stone mx-auto mb-5" />
              <p className="font-display text-xl font-light text-muted">Nothing to see here... yet</p>
              <p className="text-sm font-sans text-muted mt-2 mb-6">You haven't joined any events. Let's change that.</p>
              <Link to="/home" className="btn-gold text-xs tracking-widest uppercase px-8 py-3">
                Explore Events
              </Link>
              <div className="w-10 h-px bg-stone mx-auto mt-5" />
            </div>
          )}
        </div>
      </main>
      <Footer2 />
    </div>
  );
};

export default ProfilePage;
