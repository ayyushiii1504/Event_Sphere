import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Footer2 from '../components/Footer2';

// Icons for a beautiful, informative UI
import { 
    UserCircleIcon,
    EnvelopeIcon,
    MapPinIcon,
    CalendarDaysIcon,
    TicketIcon,
    FaceFrownIcon
} from '@heroicons/react/24/outline';

// A consistent loading spinner
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-light">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
);

// A beautiful "mini" event card for the list
const MiniEventCard = ({ event }) => {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    return (
        <Link 
            to={`/events/${event._id}`} 
            className="flex items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-primary"
        >
            <div className="flex-shrink-0 h-14 w-14 bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center rounded-lg shadow-sm">
                <CalendarDaysIcon className="h-7 w-7"/>
            </div>
            <div className="ml-4 flex-grow">
                <h4 className="font-bold text-dark text-lg">{event.title}</h4>
                <p className="text-sm text-gray-500">{formattedDate} • {event.city}</p>
            </div>
            <span className="text-primary font-bold ml-4">→</span>
        </Link>
    );
};

// A nice empty state for when no events are joined
const EmptyState = () => (
    <div className="text-center bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-slate-200">
        <TicketIcon className="h-16 w-16 mx-auto text-gray-300" />
        <h3 className="mt-4 text-xl font-semibold text-dark">Nothing to see here... yet!</h3>
        <p className="mt-2 text-gray-500">You haven't joined any events. Let's find your next experience.</p>
        <Link 
            to="/home"
            className="inline-block mt-4 bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
        >
            Explore Events
        </Link>
    </div>
);


const ProfilePage = () => {
  // --- ALL YOUR EXISTING LOGIC IS UNTOUCHED ---
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/auth/profile');
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) load(); // Only load if user is available
  }, [user]);
  // --- END OF YOUR EXISTING LOGIC ---


  if (!profile) return <LoadingSpinner />;

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* === New, Creative Profile Header Card === */}
          <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <img 
                    src={`https://ui-avatars.com/api/?name=${profile.name.split(' ').join('+')}&background=fff&color=6a11cb&size=128&bold=true`}
                    alt={profile.name}
                    className="h-28 w-28 rounded-full border-4 border-white/50 shadow-lg"
                />
                <div>
                    <h1 className="text-4xl font-extrabold">{profile.name}</h1>
                    <div className="mt-2 space-y-1 opacity-90">
                        <p className="flex items-center gap-2"><EnvelopeIcon className="h-5 w-5"/> {profile.email}</p>
                        <p className="flex items-center gap-2"><MapPinIcon className="h-5 w-5"/> {profile.city}</p>
                    </div>
                </div>
            </div>
          </div>
          
          {/* === Events Joined Section === */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-dark mb-6">Events you joined</h2>
            {profile.eventsJoined?.length ? (
              <div className="space-y-4">
                {profile.eventsJoined.map(event => (
                  <MiniEventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
      <Footer2 />
    </div>
  );
};

export default ProfilePage;