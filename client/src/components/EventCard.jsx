import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDaysIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const EventCard = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-[0_8px_30px_rgba(106,17,203,0.15)] hover:shadow-[0_12px_40px_rgba(106,17,203,0.2)] transition-shadow duration-300 ease-in-out border-t-4 border-primary overflow-hidden">
      
      {/* Key Change: Increased padding for a bigger card */}
      <div className="p-8 flex flex-col flex-grow">
        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
          {event.category}
        </p>

        {/* Key Change: Larger title for more impact */}
        <h3 className="text-3xl font-extrabold text-dark leading-tight">
          {event.title}
        </h3>
        
        {/* Key Change: Details are now in a clean, vertical list */}
        <div className="space-y-4 my-6 text-gray-600">
            <div className="flex items-center gap-3">
                <MapPinIcon className="h-6 w-6 text-gray-400 flex-shrink-0"/>
                <span className="font-semibold">{event.city}</span>
            </div>
            <div className="flex items-center gap-3">
                <CalendarDaysIcon className="h-6 w-6 text-gray-400 flex-shrink-0"/>
                <span className="font-semibold">{formattedDate}</span>
            </div>
            
        </div>
        
        {/* Pushes the button to the very bottom */}
        <div className="flex-grow"></div>
        
        {/* The footer is now a clean, focused button */}
        <div className="mt-2">
          <Link 
            to={`/events/${event._id}`} 
            className="block w-full text-center bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;