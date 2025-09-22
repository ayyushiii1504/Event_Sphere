// src/pages/HomePage.jsx
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import eventService from '../services/eventService';
import { AuthContext } from '../context/AuthContext';

// Icons for a professional UI
import { MagnifyingGlassIcon, MapPinIcon, TagIcon, FaceSmileIcon, GlobeAltIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// A beautiful component for when no events are found
const EmptyState = ({ message, city }) => (
  <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
    <FaceSmileIcon className="h-16 w-16 mx-auto text-gray-300" />
    <h3 className="mt-4 text-xl font-semibold text-dark">No Events Found</h3>
    <p className="mt-2 text-gray-500">{message} {city && <strong>{city}</strong>}.</p>
  </div>
);


const HomePage = () => {
  // --- ALL YOUR EXISTING LOGIC IS UNTOUCHED ---
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const load = async () => {
    try {
      const res = await eventService.getEvents();
      let filtered = res;

      if (search) {
        filtered = filtered.filter(ev =>
          ev.title?.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (city) {
        filtered = filtered.filter(ev =>
          ev.city?.toLowerCase().includes(city.toLowerCase())
        );
      }
      if (category) {
        filtered = filtered.filter(ev =>
          ev.category?.toLowerCase().includes(category.toLowerCase())
        );
      }
      setEvents(filtered);
    } catch (err) {
      console.error(err);
      alert('Failed to load events');
    }
  };

  useEffect(() => { load(); }, [search, city, category]); // Re-run load when filters change for real-time updates

  const userCityEvents = events.filter(ev => user?.city && ev.city.toLowerCase() === user.city.toLowerCase());
  const otherCityEvents = events.filter(ev => !user?.city || ev.city.toLowerCase() !== user.city.toLowerCase());
  // --- END OF YOUR EXISTING LOGIC ---

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Redesigned Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 px-6 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome {user?.name ? user.name.split(' ')[0] : 'Explorer'}! 🎉
                </h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Your next great experience is just a search away.
                </p>
            </div>
        </section>

        {/* Redesigned Search Bar */}
        <div className="container mx-auto px-6 -mt-12 relative z-20">
            <div className="bg-white shadow-2xl rounded-xl p-4 border border-gray-100">
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative w-full flex-grow">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2"/>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title..." className="w-full rounded-lg border-gray-200 py-3 pl-12 pr-4 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition"/>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <MapPinIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2"/>
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full rounded-lg border-gray-200 py-3 pl-12 pr-4 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition"/>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <TagIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2"/>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full rounded-lg border-gray-200 py-3 pl-12 pr-4 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition"/>
                    </div>
                </form>
            </div>
        </div>

        {/* Redesigned Event Listings */}
        <div className="container mx-auto px-6 py-16">
            {/* Events in User City */}
            <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <MapPinIcon className="h-8 w-8 text-primary"/>
                    <h2 className="text-3xl font-bold text-dark">
                        Events near you
                    </h2>
                </div>
                {userCityEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userCityEvents.map(ev => <EventCard key={ev._id} event={ev} />)}
                    </div>
                ) : (
                    <EmptyState message="There are currently no events listed for" city={user?.city} />
                )}
            </section>

            {/* Events from Other Cities */}
            <section>
                <div className="flex items-center gap-4 mb-8">
                    <GlobeAltIcon className="h-8 w-8 text-secondary"/>
                    <h2 className="text-3xl font-bold text-dark">
                        Discover Events in other cities
                    </h2>
                </div>
                {otherCityEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherCityEvents.map(ev => <EventCard key={ev._id} event={ev} />)}
                    </div>
                ) : (
                    <EmptyState message="No events found in other cities based on your search." />
                )}
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;