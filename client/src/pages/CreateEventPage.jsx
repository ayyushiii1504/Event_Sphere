import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import eventService from '../services/eventService';
import Footer2 from '../components/Footer2';

const CreateEventPage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Music');
  const [city, setCity] = useState('Jabalpur');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = { title, description: desc, category, city, date, time };
      const res = await eventService.createEvent(eventData);
      navigate(`/events/${res._id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create event');
    }
  };

  const Field = ({ label, children }) => (
    <div>
      <label className="block text-xs font-sans font-medium tracking-widest uppercase text-muted mb-2">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-sans tracking-widest uppercase text-primary mb-3">New Event</p>
            <h1 className="font-display text-5xl font-light text-dark">Bring Your Vision to Life</h1>
            <div className="w-12 h-px bg-primary mt-5" />
          </div>

          {/* Form Card */}
          <div className="bg-white border border-stone p-10" style={{ boxShadow: '0 4px 32px rgba(28,28,46,0.06)' }}>
            <form onSubmit={handleSubmit} className="space-y-7">

              <Field label="Event Title">
                <input
                  type="text"
                  placeholder="e.g. Indie Music Fest 2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-elegant"
                  required
                />
              </Field>

              <Field label="Description">
                <textarea
                  placeholder="Tell people what to expect..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="input-elegant resize-none"
                  rows={4}
                  required
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Category">
                  <input
                    type="text"
                    placeholder="e.g. Music, Tech, Art"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-elegant"
                  />
                </Field>
                <Field label="City">
                  <input
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-elegant"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Date">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input-elegant"
                    required
                  />
                </Field>
                <Field label="Time">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="input-elegant"
                  />
                </Field>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-stone" />
                <span className="text-accent text-xs">✦</span>
                <div className="flex-1 h-px bg-stone" />
              </div>

              <button type="submit" className="btn-gold w-full text-sm tracking-widest uppercase py-4">
                Publish Event
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer2 />
    </div>
  );
};

export default CreateEventPage;
