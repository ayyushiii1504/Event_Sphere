import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import eventService from '../services/eventService';
import { AuthContext } from '../context/AuthContext';

const EmptyState = ({ message, city }) => (
  <div className="text-center border border-dashed border-stone bg-cream py-16 px-8">
    <div className="w-10 h-px bg-stone mx-auto mb-5" />
    <p className="font-display text-xl font-light text-muted">
      {message} {city && <strong className="font-semibold text-charcoal">{city}</strong>}
    </p>
    <div className="w-10 h-px bg-stone mx-auto mt-5" />
  </div>
);

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const load = async () => {
    try {
      const res = await eventService.getEvents();
      let filtered = res;
      if (search) filtered = filtered.filter(ev => ev.title?.toLowerCase().includes(search.toLowerCase()));
      if (city) filtered = filtered.filter(ev => ev.city?.toLowerCase().includes(city.toLowerCase()));
      if (category) filtered = filtered.filter(ev => ev.category?.toLowerCase().includes(category.toLowerCase()));
      setEvents(filtered);
    } catch (err) {
      console.error(err);
      alert('Failed to load events');
    }
  };

  useEffect(() => { load(); }, [search, city, category]);

  const userCityEvents = events.filter(ev => user?.city && ev.city.toLowerCase() === user.city.toLowerCase());
  const otherCityEvents = events.filter(ev => !user?.city || ev.city.toLowerCase() !== user.city.toLowerCase());

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero Banner ── */}
        <section className="bg-dark relative overflow-hidden py-20 px-6">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 border border-accent/10 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 border border-accent/8 rounded-full" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <p className="text-xs font-sans tracking-widest uppercase text-accent mb-4">
              ✦ &nbsp; Welcome back, {user?.name?.split(' ')[0] || 'Explorer'} &nbsp; ✦
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">
              Your Next Great <em className="italic text-accent font-semibold">Experience</em>
            </h1>
            <p className="text-sm font-sans text-stone/60 mt-4">
              Discover events happening near you and around the world.
            </p>
          </div>
        </section>

        {/* ── Search Bar ── */}
        <div className="bg-cream border-b border-stone sticky top-16 z-30">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row gap-3">
              {[
                { placeholder: 'Search by title...', value: search, onChange: (e) => setSearch(e.target.value), icon: '⌕' },
                { placeholder: 'Filter by city...', value: city, onChange: (e) => setCity(e.target.value), icon: '◎' },
                { placeholder: 'Filter by category...', value: category, onChange: (e) => setCategory(e.target.value), icon: '◈' },
              ].map(({ placeholder, value, onChange, icon }) => (
                <div key={placeholder} className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-base select-none">{icon}</span>
                  <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="input-elegant pl-9 text-sm py-2.5"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Event Sections ── */}
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

          {/* Near You */}
          <section>
            <div className="flex items-end gap-5 mb-10">
              <div>
                <p className="text-xs font-sans tracking-widest uppercase text-primary mb-2">Local Events</p>
                <h2 className="font-display text-4xl font-light text-dark">Events Near You</h2>
              </div>
              <div className="flex-1 h-px bg-stone mb-2" />
            </div>
            {userCityEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCityEvents.map(ev => <EventCard key={ev._id} event={ev} />)}
              </div>
            ) : (
              <EmptyState message="No events currently listed for" city={user?.city} />
            )}
          </section>

          {/* Explore More */}
          <section>
            <div className="flex items-end gap-5 mb-10">
              <div>
                <p className="text-xs font-sans tracking-widest uppercase text-primary mb-2">Explore Widely</p>
                <h2 className="font-display text-4xl font-light text-dark">Events in Other Cities</h2>
              </div>
              <div className="flex-1 h-px bg-stone mb-2" />
            </div>
            {otherCityEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
