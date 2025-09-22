import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import eventService from '../services/eventService';
import Footer2 from '../components/Footer2';

// Importing icons for a beautiful UI
import { 
    DocumentPlusIcon, 
    PencilIcon, 
    Bars3BottomLeftIcon, 
    TagIcon, 
    MapPinIcon, 
    CalendarIcon, 
    ClockIcon,
    PlusCircleIcon
} from '@heroicons/react/24/outline';


const CreateEventPage = () => {
  // --- ALL YOUR EXISTING LOGIC IS UNTOUCHED ---
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
    } catch (err)      {
      console.error(err);
      alert('Failed to create event');
    }
  };
  // --- END OF YOUR EXISTING LOGIC ---


  // A helper component for beautifully styled inputs with icons
  const InputGroup = ({ label, type = "text", placeholder, value, onChange, icon, required = false }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          {icon}
        </div>
        <input 
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border-gray-300 py-3 pl-12 pr-4 text-gray-800 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition"
          required={required}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />
      {/* Key Change: Using flexbox to center the content vertically */}
      <main 
        className="flex-1 flex items-center py-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d4d8' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="container mx-auto px-6">
          {/* Key Change: Reduced padding for a more compact card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto border border-gray-100">
            
            <div className="text-center mb-8">
              {/* Key Change: Slightly smaller icon */}
              <DocumentPlusIcon className="h-14 w-14 mx-auto text-primary opacity-80" />
              <h1 className="text-4xl font-extrabold mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Bring Your Vision to Life
              </h1>
              <p className="text-gray-500 mt-3">Fill in the details below to launch your event.</p>
            </div>
            
            {/* Key Change: Reduced spacing between form elements */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputGroup 
                label="Event Title"
                placeholder="e.g., Indie Music Fest 2025"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                icon={<PencilIcon className="h-5 w-5 text-gray-400" />}
                required
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <div className="relative">
                  <div className="pointer-events-none absolute top-4 left-0 flex items-center pl-4">
                     <Bars3BottomLeftIcon className="h-5 w-5 text-gray-400" />
                  </div>
                   <textarea 
                    placeholder="Tell us all about your event..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full rounded-lg border-gray-300 py-3 pl-12 pr-4 text-gray-800 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition"
                    // Key Change: Reduced rows to make textarea shorter
                    rows={3}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup 
                  label="Category"
                  placeholder="e.g., Music, Tech"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  icon={<TagIcon className="h-5 w-5 text-gray-400" />}
                />
                 <InputGroup 
                  label="City"
                  placeholder="e.g., Jabalpur"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <InputGroup 
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  icon={<CalendarIcon className="h-5 w-5 text-gray-400" />}
                  required
                />
                <InputGroup 
                  label="Time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-lg">
                  <PlusCircleIcon className="h-6 w-6"/>
                  Create Event
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default CreateEventPage;